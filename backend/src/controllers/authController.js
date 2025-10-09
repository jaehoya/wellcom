const authService = require('../services/authService');

const register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        await authService.register(username, password, email);
        return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({ message: error.message || '서버 오류가 발생했습니다.' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        await authService.login(username, password);
        return res.status(200).json({ message: '로그인에 성공했습니다.' });
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({ message: error.message || '서버 오류가 발생했습니다.' });
    }
};

module.exports = { register, login };
