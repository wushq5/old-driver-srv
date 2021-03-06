'use strict';

let express = require('express');
let router = express.Router();
let teachersCtrl = require('../controllers/teachersCtrl');
let upload = require('../common/multer');

// GET /teachers  get all teachers
router.get('/', teachersCtrl.getAllTeachers);

// POST /teachers  new a teacher
router.post('/', upload.single('photo'), teachersCtrl.createOneTeacher);

// GET /teachers/:teacherId get specified teacher
router.get('/:teacherId', teachersCtrl.getOneTeacher);

// PUT /teachers/:teacherId  update specified teacher  
router.put('/:teacherId', upload.single('photo'), teachersCtrl.updateOneTeacher);

// DELETE /teachers/:teacherId  delete specified teacher
router.delete('/:teacherId', teachersCtrl.deleteOneTeacher);

// GET /teachers/:teacherId/homeworks  get all homeworks of the teacher
router.get('/:teacherId/homeworks', teachersCtrl.getHomeworksByTeacherId);

// GET /teachers/:teacherId/homeworks/:homeworkId  get specified homework of the teacher
router.get('/:teacherId/homeworks/:homeworkId', teachersCtrl.getHomeworkByHomeworkId);

// POST /teachers/homeworks  new a homework
router.post('/homeworks', upload.single('cover'), teachersCtrl.createOneHomework);

// DELETE /teachers/:teacherId/homeworks  delete all homeworks of the teacher
router.delete('/:teacherId/homeworks', teachersCtrl.deleteAllHomeworksByTeacherId);

// DELETE /teachers/:teacherId/homeworks/:homeworkId  delete specified homework of the teacher
router.delete('/:teacherId/homeworks/:homeworkId', teachersCtrl.deleteOneHomeworkByHomeworkId);

module.exports = router;