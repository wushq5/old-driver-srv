'use strict';

module.exports = (app) => {

	app.use('/sign_in', require('./signIn'));
	app.use('/sign_out', require('./signOut'));
	app.use('/teachers', require('./teachers'));
	app.use('/user', require('./user'));
};