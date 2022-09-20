const express = require('express');
const router = express.Router();

const {
    GetSubjectAverage,
    GetStudentTotalAverage
} = require('../controller/average-controller');

router.route('/')
    .get(GetStudentTotalAverage);

router.route('/:subject_id')
    .get(GetSubjectAverage);


module.exports = router;