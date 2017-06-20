'use strict';

let fs = require('fs');
let path = require('path');
let mongoose = require('mongoose');
let Teacher = require('../models/teacher');
let Homework = require('../models/homework');

const TeacherCtrl = {
	getAllTeachers: (req, res) => {
		Teacher.find({}, (err, teacher) => {
			if (err) {
				res.send(err);
			} else {
				res.json(teacher);
			}
		});
	},

	createOneTeacher: (req, res) => {
		let name = req.fields.name;
	  let desc = req.fields.desc;
	  let birthday = req.fields.birthday;
	  let height = req.fields.height;
	  let weight = req.fields.weight;
	  let bwh = req.fields.bwh;
	  let photo = req.files.photo.path.split(path.sep).pop();

	  try {
	  	if (!(name.length >= 1 && name.length <= 10)) {
	  		throw new Error('name\'s length ranged from 1 to 10');
	  	}
	  	if (!desc) {
	  		throw new Error('desc is required');
	  	}
	  	if (!req.files.photo.name) {
	      throw new Error('photo is required');
	    }
	  } catch (e) {
	  	fs.unlink(req.files.photo.path);
	  	res.send(e.message);
	  	return;
	  }

		let newTeacher = new Teacher({
	  	name: name,
	  	desc: desc,
	  	birthday: birthday,
	  	height: height,
	  	weight: weight,
	  	bwh: bwh,
	  	photo: photo
	  });
		
		Teacher.findOne({name: name}, (err, doc) => {
			if (err) {
				res.send(err);
			}

			if (!doc) {
				newTeacher.save((err, teacher) => {
					if (err) {
						res.send(err);
					} else {
						res.json(teacher);
					}
				});
			} else {
				res.send(`Teacher ${name} already exists`);
			}
		});
	},

	getOneTeacher: (req, res) => {
		Teacher.find({id: req.params.teacherId}, (err, teacher) => {
			if (err) {
				res.send(err);
			} else {
				res.json(teacher);
			}
		});
	},

	updateOneTeacher: (req, res) => {
		Teacher.findOneAndUpdate(req.params.teacherId, req.body, {new: true }, (err, teacher) => {
			if (err) {
				res.send(err);
			} else {
				res.json(teacher);
			}
		});
	},

	deleteOneTeacher: (req, res) => {
		// del homeworks then del teacher
		Homework.remove({
			teacherId: req.params.teacherId
		}, (err) => {
			if (err) {
				res.send(err);
			}
				
			Teacher.remove({
				teacherId: req.params.teacherId
			}, (err) => {
				if (err) {
					res.send(err);
				}
				res.json({ msg: 'Teacher successfully deleted' });
			})
		});
	},

	getHomeworksByTeacherId: (req, res) => {
		Homework.find({teacherId: req.params.teacherId}, (err, homeworks) => {
			if (err) {
				res.send(err);
			}
			res.json(homeworks);
		});
	},

	getHomeworkByHomeworkId: (req, res) => {
		Homework.find({homeworkId: req.params.homeworkId}, (err, homework) => {
			if (err) {
				res.send(err);
			}
			res.json(homework);
		})
	},

	createOneHomework: (req, res) => {
		let newHomework = new Homework(req.body);
		newHomework.save((err, homework) => {
			if (err) {
				res.send(err);
			}
			res.json(homework);
		})
	},

	deleteAllHomeworksByTeacherId: (req, res) => {
		Homework.remove({
			teacherId: req.params.teacherId
		}, (err) => {
			if (err) {
				res.send(err);
			}
			res.json({ msg: 'Teacher successfully deleted' });
		});
	},

	deleteOneHomeworkByHomeworkId: (req, res) => {
		Homework.remove({
			teacherId: req.params.homeworkId
		}, (err) => {
			if (err) {
				res.send(err);
			}
			res.json({ msg: 'Teacher successfully deleted' });
		});
	}
};

module.exports = TeacherCtrl;