const express = require('express');
const router = express.Router();
const {AssignExamType} = require('../middleware/activity-middleware');
const {
    CreateExamResult,
    GetAllExamResult,
    GetSingleExamResult,
    RemoveExamResult,
    UpdateExamResult
} = require('../controller/exam-controller');




router.route('/')
    .get(AssignExamType('quiz'),GetAllExamResult)
    .post(AssignExamType('quiz'),CreateExamResult);

router.route('/:id')
    .get(AssignExamType('quiz'),GetSingleExamResult)
    .delete(AssignExamType('quiz'),RemoveExamResult)
    .patch(AssignExamType('quiz'),UpdateExamResult);

    
    

module.exports = router;