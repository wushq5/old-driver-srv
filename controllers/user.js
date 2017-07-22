'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('config-lite')(__dirname);

const UserCtrl = {
	createUser: (req, res) => {
		if (!req.body.name || !req.body.password) {
			res.json({status: false, msg: 'name & password required'});
		} else {
			var newUser = new User({
				name: req.body.name,
				password: req.body.password
			});

			newUser.save((err) => {
				if (err) {
					return res.json({status: false, msg: err});
				}
				res.json({status: true, msg: 'create user success'});
			});
		}
	},

	signIn: (req, res) => {
		User.findOne({name: req.body.name}, (err, user) => {
			if (err) {
	      return res.send(err);
	    }

	    if (!user) {
	    	res.json({status: false, msg: `User '${req.body.name}' does not exist!`});
	    } else {
	    	// check password
				user.comparePassword(req.body.password, (err, isMatch) => {
					if (isMatch && !err) {
						let token = jwt.sign({name: user.name }, config.secret, {expiresIn: 10080 });
						user.token = token;
						user.save(function(err) {
							if (err) {
								res.send(err);
							}
						});
						res.json({status: true, msg: '验证成功!', token: 'Bearer ' + token, name: user.name });
					} else {
						res.send({status: false, msg: 'password error'});
					}
	    	})
			}
		})
	}
};

module.exports = UserCtrl;