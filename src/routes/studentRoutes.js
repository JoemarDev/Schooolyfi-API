const express = require('express');
const router = express.Router();

// controllers
const {
    getStudents,
    getSingleStudent,
    updateStudent,
    removeStudent,
    createStudents
} = require('../controller/studentController');

router.route('/').get(getStudents).post(createStudents);
router.route('/:id').get(getSingleStudent).patch(updateStudent).delete(removeStudent);

module.exports = router;
