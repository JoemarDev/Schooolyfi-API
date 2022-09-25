const Student = require('../model/Student');
const Teacher = require('../model/Teacher');
const CustomError = require('../errors');
const {attachCookieToResponse} = require('../util');
const { StatusCodes } = require('http-status-codes');

const StudentLogin = async(req,res) => {

    const {userName , password} = req.body;

    if(!userName || !password) {
        throw new CustomError.BadRequestError('Please provide username and password');
    }

    const student = await Student.findOne({userName : userName});

    if(!student) {
        throw new CustomError.NotFoundError(`No Student with username ${userName}`);
    }

    const isPasswordCorrect = await student.comparePassword(password);

    if(!isPasswordCorrect) {
        throw new CustomError.UnAuthenticatedError("Invalid Credentials");
    }
    const TokenPayload = {'user_type' : 'student','user_id' : student._id};

    await attachCookieToResponse({user : TokenPayload , res});

    res.status(StatusCodes.OK).json(TokenPayload);
};

const TeacherLogin = async(req,res) => {
    const {userName , password} = req.body;

    if(!userName || !password) {
        throw new CustomError.BadRequestError('Please provide username and password');
    }

    const teacher = await Teacher.findOne({userName : userName});

    if(!teacher) {
        throw new CustomError.NotFoundError(`No Teacher with username ${userName}`);
    }

    const isPasswordCorrect = await teacher.comparePassword(password);

    if(!isPasswordCorrect) {
        throw new CustomError.UnAuthenticatedError("Invalid Credentials");
    }
    const TokenPayload = {'user_type' : 'teacher', 'user_id' : teacher._id};

    await attachCookieToResponse({user : TokenPayload , res});

    res.status(StatusCodes.OK).json(TokenPayload);

};

module.exports = {
    StudentLogin,
    TeacherLogin,
}