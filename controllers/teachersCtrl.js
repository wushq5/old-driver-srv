'use strict';

let fs = require('fs');
let path = require('path');
let mongoose = require('mongoose');
let Teacher = require('../models/teacher');
let Homework = require('../models/homework');
let config = require('../config');

const SERVER_IP = config.server;

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
		let name = req.body.name;
	  let desc = req.body.desc;
	  let birthday = req.body.birthday;
	  let height = req.body.height;
	  let weight = req.body.weight;
	  let bwh = req.body.bwh;
	  let photo = null;

	  try {
	  	if (!(name.length >= 1 && name.length <= 10)) {
	  		throw new Error('name\'s length ranged from 1 to 10');
	  	}
	  	if (!desc) {
	  		throw new Error('desc is required');
	  	}
	  	if (!req.file) {
	      throw new Error('photo is required');
	    }
	    photo = req.file.path.split(path.sep).pop();
	  } catch (e) {
	  	fs.unlink(req.file.path);
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
	  	photo: SERVER_IP + '/assets/' + photo
	  });
		
		Teacher.findOne({name: name}, (err, doc) => {
			if (err) {
				fs.unlink(req.file.path);
				res.send(err);
			}

			if (!doc) {
				newTeacher.save((err, teacher) => {
					if (err) {
						fs.unlink(req.file.path);
						res.send(err);
					} else {
						res.json(teacher);
					}
				});
			} else {
				fs.unlink(req.file.path);
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
		Homework.find({teacher_id: req.params.teacherId}, (err, homeworks) => {
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
		let id = req.fields.id;
		let name = req.fields.name;
		let teacherName = req.fields.teacher_name;
		let teacherId = req.fields.teacher_id;
	  let desc = req.fields.desc;
	  let cover = req.files.cover.path.split(path.sep).pop();

	  try {
	  	if (!(id.length >= 1 && id.length <= 10)) {
	  		throw new Error('name\'s length ranged from 1 to 10');
	  	}
	  	if (!teacherName) {
	  		throw new Error('teacher_name is required');
	  	}
	  	if (!teacherId) {
	  		throw new Error('teacher_id is required');
	  	}
	  	if (!cover) {
	      throw new Error('cover is required');
	    }
	  } catch (e) {
	  	fs.unlink(req.files.cover.path);
	  	res.send(e.message);
	  	return;
	  }

		let newHomework = new Homework({
			id: id,
	  	name: name,
	  	desc: desc,
	  	teacher_name: teacherName,
	  	teacher_id: teacherId,
	  	cover: SERVER_IP + '/assets/' + cover
	  });
		
		Homework.findOne({id}, (err, doc) => {
			if (err) {
				fs.unlink(req.files.cover.path);
				res.send(err);
			}

			if (!doc) {
				newHomework.save((err, homework) => {
					if (err) {
						fs.unlink(req.files.cover.path);
						res.send(err);
					} else {
						res.json(homework);
					}
				});
			} else {
				fs.unlink(req.files.cover.path);
				res.send(`Homework ${id} already exists`);
			}
		});
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