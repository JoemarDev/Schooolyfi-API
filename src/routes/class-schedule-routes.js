const express = require('express');
const router = express.Router();

// Middlewares
const {AuthenticateUser , AuthorizedPermission} = require('../middleware/authentication-middleware');

const {
    createClassSchedule,
    updateClassSchedule,
    getAllClassSchedule,
    removeClassSchedule,
    getSingleClassSchedule
} = require('../controller/class-schedule-controller');

router.route('/')
    .get(AuthenticateUser,getAllClassSchedule)
    .post(AuthenticateUser,AuthorizedPermission('admin' , 'teacher'),createClassSchedule);

router.route('/:id')
    .get(AuthenticateUser,getSingleClassSchedule)
    .patch(AuthenticateUser,AuthorizedPermission('admin'),updateClassSchedule)
    .delete(AuthenticateUser,AuthorizedPermission('admin'),removeClassSchedule);

module.exports = router;

