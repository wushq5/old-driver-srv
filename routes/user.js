'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();
const userCtrl = require('../controllers/user');

require('../common/passport')(passport);

router.post('/', userCtrl.createUser);

router.post('/token', userCtrl.signIn);

router.get('/', passport.authenticate('bearer', { session: false }),
  (req, res) => {
    res.send('fake ass');
  });

module.exports = router;