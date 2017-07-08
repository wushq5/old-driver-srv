'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeworkSchema = new Schema({
	id: { type: String, required: true, index: true },
	name: { type: String },
	desc: { type: String },
	cover: { type: String },
	teacher_name: { type: String },
	teacher_id: { type: String }
});

module.exports = mongoose.model('Homework', HomeworkSchema);