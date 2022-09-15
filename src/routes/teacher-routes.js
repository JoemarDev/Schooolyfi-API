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
    getTeacherProfile
} = require('../controller/teacher-controller');

router.route('/')
    .get(AuthenticateUser,AuthorizedPermission('admin'),getAllTeacher)
    .post(AuthenticateUser,AuthorizedPermission('admin'),createTeacher);

router.route('/schedule').get(AuthenticateUser,AuthorizedPermission('admin' , 'teacher'),getTeacherSchedule);
router.route('/profile').get(AuthenticateUser,AuthorizedPermission('teacher'),getTeacherProfile);


router.route('/:id')
    .get(AuthenticateUser,AuthorizedPermission('admin'),getSingleTeacher)
    .patch(AuthenticateUser,AuthorizedPermission('admin'),updateTeacher)
    .delete(AuthenticateUser,AuthorizedPermission('admin'),removeTeacher);

module.exports = router;