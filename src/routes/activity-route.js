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
    .get(AssignPropertyType('activiy'),GetAllProject)
    .post(AssignPropertyType('activiy'),CreateProject);

router.route('/:id')
    .get(AssignPropertyType('activiy'),GetSingleProject)
    .patch(AssignPropertyType('activiy'),UdpateProject)
    .delete(AssignPropertyType('activiy'),RemoveProject);

module.exports = router;