const express = require('express');
const router = express.Router();
const {AssignPropertyType} = require('../middleware/activity-middleware');
const {
    CreateProject,
    GetAllProject,
    GetSingleProject,
    RemoveProject,
    UdpateProject
} = require('../controller/project-controller');

router.route('/')
    .get(AssignPropertyType('project'),GetAllProject)
    .post(AssignPropertyType('project'),CreateProject);

router.route('/:id')
    .get(AssignPropertyType('project'),GetSingleProject)
    .patch(AssignPropertyType('project'),UdpateProject)
    .delete(AssignPropertyType('project'),RemoveProject);

module.exports = router;