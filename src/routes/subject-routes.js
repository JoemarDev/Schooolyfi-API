const express = require('express');
const router = express.Router();

const {
    createSubject,
    getAllSujects,
    getSingleSubjects,
    updateSubject,
    removeSubject,
    GetSubjectLessonPlan
} = require('../controller/subject-controller');

// Middlewares
const {AuthenticateUser , AuthorizedPermission} = require('../middleware/authentication-middleware');


router.route('/')
    .get(AuthenticateUser,getAllSujects)
    .post(AuthenticateUser,AuthorizedPermission('admin' , 'teacher' , 'all'),createSubject);

router.route('/:id/lesson-plans').get(GetSubjectLessonPlan);

router.route('/:id')
    .get(AuthenticateUser,getSingleSubjects)
    .patch(AuthenticateUser,AuthorizedPermission('admin'),updateSubject)
    .delete(AuthenticateUser,AuthorizedPermission('admin' ,'all'),removeSubject);

module.exports = router;