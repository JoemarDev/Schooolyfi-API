const express = require('express');
const router = express.Router();


const {
    CreateAttendance,
    RemoveAttendance,
    UpdateAttendace,
    getSingleAttendace,
    getAllAttendance,
}  = require('../controller/attendance-controller');

router.route('/')
    .get(getAllAttendance)
    .post(CreateAttendance)

router.route('/:id')
    .get(getSingleAttendace)
    .patch(UpdateAttendace)
    .delete(RemoveAttendance);

module.exports = router;