const express = require('express');
const router = express.Router();

const {
    CreateLessonPlan,
    DeleteLessonPlan,
    UpdateLessonPlan,
    GetAllLessonPlan,
    GetLessonPlanDetails
} = require('../controller/lesson-plan-controller');


router.route('/')
    .get(GetAllLessonPlan)
    .post(CreateLessonPlan);

router.route('/:id')
    .get(GetLessonPlanDetails)
    .patch(UpdateLessonPlan)
    .delete(DeleteLessonPlan);
    
module.exports = router;