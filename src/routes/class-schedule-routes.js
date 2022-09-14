const express = require('express');
const router = express.Router();


const {
    createClassSchedule,
    updateClassSchedule,
    getAllClassSchedule,
    removeClassSchedule,
    getSingleClassSchedule
} = require('../controller/class-schedule-controller');

router.route('/')
    .get(getAllClassSchedule)
    .post(createClassSchedule);

router.route('/:id')
    .get(getSingleClassSchedule)
    .patch(updateClassSchedule)
    .delete(removeClassSchedule);

module.exports = router;

