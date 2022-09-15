const express = require('express');
const router = express.Router();

const {
    AssignSubjectToTeacher,
    RemoveSubjectToTeacher,
    FindSubjectTeacherForStudent,
    FindAvailableTeacherForSubject
} = require('../controller/subject-schedule-controller');
    
router.route('/assign-subject-to-teacher')
    .post(AssignSubjectToTeacher);

router.route('/:subject_id')
    .get(FindAvailableTeacherForSubject)
    .post(FindSubjectTeacherForStudent)
    .delete(RemoveSubjectToTeacher)
   


module.exports = router;
