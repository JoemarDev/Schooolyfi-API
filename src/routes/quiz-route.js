const express = require('express');
const router = express.Router();
const {AssignPropertyType} = require('../middleware/activity-middleware');
const {
    CreateExamResult,
    GetAllExamResult,
    GetSingleExamResult,
    RemoveExamResult,
    UpdateExamResult
} = require('../controller/exam-controller');




router.route('/')
    .get(AssignPropertyType('quiz'),GetAllExamResult)
    .post(AssignPropertyType('quiz'),CreateExamResult);

router.route('/:id')
    .get(AssignPropertyType('quiz'),GetSingleExamResult)
    .delete(AssignPropertyType('quiz'),RemoveExamResult)
    .patch(AssignPropertyType('quiz'),UpdateExamResult);

    
    

module.exports = router;