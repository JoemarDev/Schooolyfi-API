const express = require('express');

const router = express.Router();

const {
    createTeacher,
    getAllTeacher,
    getSingleTeacher,
    updateTeacher,
    removeTeacher,
    getTeacherSchedule
} = require('../controller/teacher-controller');

router.route('/')
    .get(getAllTeacher)
    .post(createTeacher);

router.route('/schedule').get(getTeacherSchedule);

router.route('/:id')
    .get(getSingleTeacher)
    .patch(updateTeacher)
    .delete(removeTeacher);

module.exports = router;