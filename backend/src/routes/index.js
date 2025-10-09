const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const mainRouter = require('./main');

router.use('/', mainRouter);
router.use('/api', authRouter);

module.exports = router;