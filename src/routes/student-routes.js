const express = require('express');
const router = express.Router();

// controllers
const {
    getStudents,
    getSingleStudent,
    updateStudent,
    removeStudent,
    createStudents,
    getStudentSchedule
} = require('../controller/student-controller');

router.route('/')
    .get(getStudents)
    .post(createStudents);

router.route('/schedule').get(getStudentSchedule);

router.route('/:id')
    .get(getSingleStudent)
    .patch(updateStudent)
    .delete(removeStudent);

module.exports = router;
