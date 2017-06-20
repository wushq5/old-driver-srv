'use strict';

const SignInCtrl = {
	checkSignIn: (req, res) => {
		if (req.body.username === '河蟹' && req.body.password === 'fuckyou') {
			res.json({status: 'SUCCESS'});
		} else {
			res.json({status: 'FAIL'});
		}
	}
};

module.exports = SignInCtrl;