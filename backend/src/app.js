const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('../models');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express 서버가 실행 중입니다!');
});

// 회원가입
app.post('/api/register', async (req, res) => {
   const { username, password, email } = req.body;

   //필수값 체크
   if(!username || !password || !email) {
      return res.status(400).json({message: '아이디, 비밀번호, 이메일을 모두 입력하세요'})
   }
   try {
    //중복 체크
    const exists = await db.User.findOne({ where: { username } });
    if (exists) {
        return res.status(409).json({message: '이미 사용 중인 아이디입니다.'});
    }
    //비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);
    //저장
    await db.User.create({ username, password: hashedPassword, email, registeredDate: new Date() });
    return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
   } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
   }
})

//로그인
app.post('/api/login', async (req, res) => {
   const { username, password } = req.body;

   //필수값 체크
   if(!username || !password) {
      return res.status(400).json({message: '아이디와 비밀번호를 입력하세요'})
   }
   try {
    //유저 확인
    const user = await db.User.findOne({ where: { username } });
    if (!user) {
        return res.status(401).json({message: '아이디 또는 비밀번호가 잘못되었습니다.'});
    }
    //비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({message: '아이디 또는 비밀번호가 잘못되었습니다.'});
    }
    return res.status(200).json({ message: '로그인에 성공했습니다.' });
   } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
   }
})

const PORT = process.env.PORT || 5000;

db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
    });
});