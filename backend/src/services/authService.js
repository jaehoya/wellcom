const bcrypt = require('bcrypt');
const db = require('../models');

const register = async (username, password, email) => {
    const exists = await db.User.findOne({ where: { username } });
    if (exists) {
        const error = new Error('이미 사용 중인 아이디입니다.');
        error.status = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.User.create({ username, password: hashedPassword, email, registeredDate: new Date() });
};

const login = async (username, password) => {
    const user = await db.User.findOne({ where: { username } });
    if (!user) {
        const error = new Error('아이디 또는 비밀번호가 잘못되었습니다.');
        error.status = 401;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error('아이디 또는 비밀번호가 잘못되었습니다.');
        error.status = 401;
        throw error;
    }
};

module.exports = { register, login };
