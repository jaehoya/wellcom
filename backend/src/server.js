const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 5000;

db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
    });
});
