const express = require('express');
const router = express.Router();
const { AssignPropertyType } = require('../middleware/activity-middleware');
const {
    CreateProject,
    GetAllProject,
    GetSingleProject,
    RemoveProject,
    UdpateProject
} = require('../controller/project-controller');

router.route('/')
    .get(AssignPropertyType('activity'), GetAllProject)
    .post(AssignPropertyType('activity'), CreateProject);

router.route('/:id')
    .get(AssignPropertyType('activity'), GetSingleProject)
    .patch(AssignPropertyType('activity'), UdpateProject)
    .delete(AssignPropertyType('activity'), RemoveProject);

module.exports = router;