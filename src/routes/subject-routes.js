const express = require('express');
const router = express.Router();

const {
    createSubject,
    getAllSujects,
    getSingleSubjects,
    updateSubject,
    removeSubject
} = require('../controller/subject-controller');

router.route('/')
    .get(getAllSujects)
    .post(createSubject);

router.route('/:id')
    .get(getSingleSubjects)
    .patch(updateSubject)
    .delete(removeSubject);

module.exports = router;