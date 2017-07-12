'use strict';

module.exports = (app) => {

	app.use('/teachers', require('./teachers'));
	app.use('/user', require('./user'));
};