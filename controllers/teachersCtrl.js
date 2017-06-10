'use strict';

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
		let newTeacher = new Teacher(req.body);
		newTeacher.save((err, teacher) => {
			if (err) {
				res.send(err);
			} else {
				res.json(teacher);
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