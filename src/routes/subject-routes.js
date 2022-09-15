const express = require('express');
const router = express.Router();

const {
    createSubject,
    getAllSujects,
    getSingleSubjects,
    updateSubject,
    removeSubject
} = require('../controller/subject-controller');

// Middlewares
const {AuthenticateUser , AuthorizedPermission} = require('../middleware/authentication-middleware');


router.route('/')
    .get(AuthenticateUser,getAllSujects)
    .post(AuthenticateUser,AuthorizedPermission('admin' , 'teacher'),createSubject);

router.route('/:id')
    .get(AuthenticateUser,getSingleSubjects)
    .patch(AuthenticateUser,AuthorizedPermission('admin'),updateSubject)
    .delete(AuthenticateUser,AuthorizedPermission('admin'),removeSubject);

module.exports = router;