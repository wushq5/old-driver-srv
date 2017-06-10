'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let HomeworkSchema = new Schema({
	id: {type: String, required: true, index: true},
	name: {type: String},
	description: {type: String},
	cover: {type: String},
	teacherId: {type: String}
});

module.exports = mongoose.model('Homework', HomeworkSchema);