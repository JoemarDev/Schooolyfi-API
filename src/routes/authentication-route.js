const express = require('express');
const router = express.Router();

const {StudentLogin,TeacherLogin} = require('../controller/authentication');

router.route('/teacher').post(TeacherLogin);
router.route('/student').post(StudentLogin);

module.exports = router;