const validateRegister = (req, res, next) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ message: '아이디, 비밀번호, 이메일을 모두 입력하세요' });
    }
    next();
};

const validateLogin = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: '아이디와 비밀번호를 입력하세요' });
    }
    next();
};

module.exports = { validateRegister, validateLogin };
