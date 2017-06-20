'use strict';

let express = require('express');
let router = express.Router();
let signInCtrl = require('../controllers/signInCtrl')

// POST /sign_in/adm 管理员登录
router.post('/adm', signInCtrl.checkSignIn);

module.exports = router;