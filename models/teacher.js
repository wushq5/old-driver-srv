'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const TeacherSchema = new Schema({
	name: { type: String, required: true, index: true },
	photo: { type: String },
	desc: { type: String },
	birthday: { type: Date },
	height: { type: Number },
	weight: { type: Number },
	bwh: { type: String }
});

module.exports = mongoose.model('Teacher', TeacherSchema);