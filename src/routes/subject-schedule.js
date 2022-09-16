const express = require('express');
const router = express.Router();

const {
    AssignSubjectToTeacher,
    FindAvailableTeacherForSubject
} = require('../controller/schedule-controller');
    

router.route('/assign-subject-to-teacher')
    .post(AssignSubjectToTeacher);

router.route('/:subject_id')
    .get(FindAvailableTeacherForSubject)
   


module.exports = router;
