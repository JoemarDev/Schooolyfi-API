const express = require('express');
const router = express.Router();

const  {    
    AdminLogin,
    UpdateAdminPassword,
    CreateAdminAccount,
} = require('../controller/admin-controller');

router.route('/create-admin-account').get(CreateAdminAccount);

router.route('/').post(AdminLogin)
    .patch(UpdateAdminPassword);

module.exports = router;