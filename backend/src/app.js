const express = require("express");
const app = express();
require("dotenv").config(); // .env 환경변수 로드
const routes = require('./routes'); // 라우터

const cors = require("cors");  // CORS 미들웨어 추가
app.use(cors());  // 모든 도메인 허용

app.use(express.json()); // JSON 요청 파싱

// 라우터 등록 
app.use('/', routes);

// 공통 에러 핸들러 (마지막에 두기)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const code = err.code || "INTERNAL_SERVER_ERROR";
  const message = err.message || "서버 오류가 발생했습니다.";

  res.status(status).json({ 
    state: status,
    code,
    message });
});

module.exports = app;