const express = require('express');
const router = express.Router();

// Middlewares
const {AuthenticateUser , AuthorizedPermission} = require('../middleware/authentication-middleware');

// controllers
const {
    getStudents,
    getSingleStudent,
    updateStudent,
    removeStudent,
    createStudents,
    getStudentSchedule,
    getStudentProfile,
    GetStudentSubjects
} = require('../controller/student-controller');

router.route('/')
    .get(getStudents)
    .post(createStudents);

router.route('/schedule')
    .get(AuthenticateUser,getStudentSchedule);

router.route('/profile')
    .get(AuthenticateUser,AuthorizedPermission('student'),getStudentProfile);

router.route('/:id/subjects')
    .get(AuthenticateUser,GetStudentSubjects);

router.route('/:id')
    .get(getSingleStudent)
    .patch(AuthenticateUser,AuthorizedPermission('admin' ,'all'),updateStudent)
    .delete(AuthenticateUser,AuthorizedPermission('admin' ,'all'),removeStudent);

module.exports = router;
