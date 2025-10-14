const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, (req, res) => {
  res.send(`${req.user.username}님, 환영합니다!`)
});

module.exports = router;
