const express = require('express');
const router = express.Router();

// Middlewares
const {AuthenticateUser , AuthorizedPermission} = require('../middleware/authentication-middleware');

const {
    CreateStudentSubjectSchedule,
} = require('../controller/student-schedule-controller');

router.route('/').post(AuthenticateUser,CreateStudentSubjectSchedule);


module.exports = router;

