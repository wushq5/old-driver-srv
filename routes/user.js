'use strict';

let express = require('express');
let jwt = require('jsonwebtoken');
let router = express.Router();
let userCtrl = require('../controllers/user');

router.post('/', userCtrl.createUser);

router.post('/token', userCtrl.createToken);

module.exports = router;