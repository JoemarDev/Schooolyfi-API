const express = require('express');

const router = express.Router();

const {
    getAllCourse,
    getCourseInformation,
    getAllCourseSubject,
    updateCourseInformation,
    removeCourse,
    createCourse,
    GetAllStudentsWhoTakeTheCourse
} = require('../controller/course-controller');


router.route('/').get(getAllCourse)
    .post(createCourse);

    
router.route('/:id/all-students').get(GetAllStudentsWhoTakeTheCourse)

.post(createCourse);

router.route('/:id/students').get(getAllCourse)
    .post(createCourse);

router.route('/:id/subjects')
    .get(getAllCourseSubject);

router.route('/:id')
    .get(getCourseInformation)
    .patch(updateCourseInformation)
    .delete(removeCourse);


module.exports = router;