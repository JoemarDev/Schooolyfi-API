const express = require('express');
const router = express.Router();

const {
    GetSubjectAverage,
    GetStudentTotalAverage
} = require('../controller/average-controller');

router.route('/subject-average')
    .get(GetSubjectAverage);

router.route('/:studentId')
    .get(GetStudentTotalAverage);


module.exports = router;