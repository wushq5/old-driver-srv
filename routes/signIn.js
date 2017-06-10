'use strict';

let express = require('express');
let router = express.Router();

// POST /sign_in/adm 管理员登录
router.post('/adm', (req, res, next) => {
	res.send('hello world');
});

module.exports = router;