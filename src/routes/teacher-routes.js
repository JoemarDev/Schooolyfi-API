const express = require('express');

const router = express.Router();

// Middlewares
const {AuthenticateUser , AuthorizedPermission} = require('../middleware/authentication-middleware');


const {
    createTeacher,
    getAllTeacher,
    getSingleTeacher,
    updateTeacher,
    removeTeacher,
    getTeacherSchedule,
    getTeacherProfile,
    GetTeacherStudentLists,
    RemoveSubjectScheduleFromTeacher,
    ChangeAssignTeacherFromTheSchedule
} = require('../controller/teacher-controller');

router.route('/')
    .get(AuthenticateUser,AuthorizedPermission('admin' , 'all'),getAllTeacher)
    .post(AuthenticateUser,AuthorizedPermission('admin','all'),createTeacher);

router.route('/schedule/students/:id')
    .get(AuthenticateUser,AuthorizedPermission('admin' , 'teacher'),GetTeacherStudentLists);

router.route('/schedule')
    .get(AuthenticateUser,AuthorizedPermission('admin' , 'teacher'),getTeacherSchedule)
    .patch(AuthenticateUser,AuthorizedPermission('admin' , 'teacher'),ChangeAssignTeacherFromTheSchedule)
    
router.route('/schedule/:id')
    .delete(AuthenticateUser,AuthorizedPermission('admin' , 'teacher'),RemoveSubjectScheduleFromTeacher);

router.route('/profile')
    .get(AuthenticateUser,AuthorizedPermission('teacher'),getTeacherProfile);

router.route('/:id')
    .get(AuthenticateUser,AuthorizedPermission('admin'),getSingleTeacher)
    .patch(AuthenticateUser,AuthorizedPermission('admin'),updateTeacher)
    .delete(AuthenticateUser,AuthorizedPermission('admin'),removeTeacher);

module.exports = router;