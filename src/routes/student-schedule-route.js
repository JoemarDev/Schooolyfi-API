const express = require('express');
const router = express.Router();

// Middlewares
const {AuthenticateUser , AuthorizedPermission} = require('../middleware/authentication-middleware');

const {
    CreateStudentSubjectSchedule,
    DeleteStudentSubjectSchedule,
    ChangeStudentSubjectSchedule,
    GetScheduleInformation
} = require('../controller/schedule-controller');

router.route('/')
    .post(AuthenticateUser,CreateStudentSubjectSchedule)


router.route('/:schedule_id')
    .get(AuthenticateUser,GetScheduleInformation)
    .patch(AuthenticateUser,ChangeStudentSubjectSchedule)
    .delete(AuthenticateUser,DeleteStudentSubjectSchedule);


module.exports = router;

