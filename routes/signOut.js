'use strict';

let express = require('express');
let router = express.Router();

// POST /sign_out/adm 管理员登出
router.get('/adm', (req, res, next) => {
	res.send('hello world');
});

module.exports = router;