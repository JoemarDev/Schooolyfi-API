const express = require('express');
const router = express.Router();

const {
    CreateFormula,
    DeleteFormula,
    UpdateFormula,
    GetAllFormula,
    GetSingleFormula
} = require('../controller/grading-formula-controller');

router.route('/')
    .get(GetAllFormula)
    .post(CreateFormula);

router.route('/:id')
    .get(GetSingleFormula)
    .delete(DeleteFormula)
    .patch(UpdateFormula);


module.exports = router;