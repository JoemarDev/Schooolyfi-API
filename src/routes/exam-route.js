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
    .get(AssignPropertyType('exam'),GetAllExamResult)
    .post(AssignPropertyType('exam'),CreateExamResult);

router.route('/:id')
    .get(AssignPropertyType('exam'),GetSingleExamResult)
    .delete(AssignPropertyType('exam'),RemoveExamResult)
    .patch(AssignPropertyType('exam'),UpdateExamResult);
    

module.exports = router;