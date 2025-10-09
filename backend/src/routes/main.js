const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Express 서버가 실행 중입니다!');
});

module.exports = router;
