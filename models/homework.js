'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let HomeworkSchema = new Schema({
	id: {type: String, required: true, index: true},
	name: {type: String},
	desc: {type: String},
	cover: {type: String},
	teacher_id: {type: String}
});

module.exports = mongoose.model('Homework', HomeworkSchema);