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
    .get(AssignExamType('exam'),GetAllExamResult)
    .post(AssignExamType('exam'),CreateExamResult);

router.route('/:id')
    .get(AssignExamType('exam'),GetSingleExamResult)
    .delete(AssignExamType('exam'),RemoveExamResult)
    .patch(AssignExamType('exam'),UpdateExamResult);
    

module.exports = router;