
const GradingFormula = require('../model/GradingFormula');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');


const CreateFormula = async (req, res) => {
    const { type, percentage } = req.body;

    if (!type || !percentage) {
        throw new CustomError.BadRequestError('Please provide a type , and percentage');
    }

    const existingFormula = await GradingFormula.findOne({ type: type });

    // if there is a existing one update the formula instead 
    if (existingFormula) {
        existingFormula.percentage = percentage;
        existingFormula.save();

        res.status(StatusCodes.OK).json({ gradingFormula: existingFormula });
    } else {
        const gradingFormula = await GradingFormula.create(req.body);
        res.status(StatusCodes.CREATED).json({ gradingFormula });
    }


};

const DeleteFormula = async (req, res) => {
    const { id } = req.params;

    const gradingFormula = GradingFormula.findOne({ _id: id });

    if (!gradingFormula) {
        throw new CustomError.NotFoundError(`No fourmula with id : ${id}`);
    }

    await gradingFormula.remove();

    res.send("Grading Formula Successfully deleted.");
};

const UpdateFormula = async (req, res) => {
    const { id } = req.params;

    const gradingFormula = await GradingFormula.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true, runValidators: true },
    );

    if (!gradingFormula) {
        throw new CustomError.NotFoundError(`No Fomula with id : ${id}`);
    }

    res.status(StatusCodes.OK).json({ gradingFormula });
}

const GetAllFormula = async (req, res) => {
    const gradingFormulas = await GradingFormula.find({});
    res.status(StatusCodes.OK).json({ gradingFormulas })
}

const GetSingleFormula = async (req, res) => {

    const { id } = req.params;

    const gradingFormula = await GradingFormula.findOne({ _id: id });

    if (!gradingFormula) {
        throw new CustomError.NotFoundError(`No fourmula with id : ${id}`);
    }

    res.status(StatusCodes.OK).json({ gradingFormula });
}

module.exports = {
    CreateFormula,
    DeleteFormula,
    UpdateFormula,
    GetAllFormula,
    GetSingleFormula
}