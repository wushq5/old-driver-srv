'use strict';

let passport = require('passport');
let Strategy = require('passport-http-bearer').Strategy;

const User = require('../models/user');

module.exports = function(passport) {
  passport.use(new Strategy(
    function(token, done) {
      User.findOne({
        token: token
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  ));
};