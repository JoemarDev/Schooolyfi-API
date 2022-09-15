const StudentSchedule = require('../model/Student-Schedule');
const SubjectSchedule = require('../model/Subject-Schedule');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const {CheckStudentAvailability} = require('../util');

const CreateStudentSubjectSchedule = async(req,res) => {

    const {subjectSchedule} = req.body;

    if(!subjectSchedule) {
        throw new CustomError.BadRequestError('Please provide a subject schedule id');
    }

    const Schedule = await SubjectSchedule.findOne({subjectSchedule});

    if(!Schedule) {
        throw new CustomError.BadRequestError('This Schedule does not exits');
    }

    const isAlreadyHaveTheSubject = await StudentSchedule.findOne({subjectSchedule});

    if(isAlreadyHaveTheSubject) {
        throw new CustomError.BadRequestError("Student already have this subject. Please select another one.")
    }

    req.body.student = req.user.user_id;
    
    const isAvailable = await CheckStudentAvailability({
        studentId : req.user.user_id , 
        classTimeStart : Schedule.classTimeStart , 
        classTimeDismiss : Schedule.classTimeDismiss
    });

    if(!isAvailable) {
        throw new CustomError.BadRequestError(`Student is not available on provide schedule`)
    }

    const studentSchedule = await StudentSchedule.create(req.body);

    res.status(StatusCodes.CREATED).json(studentSchedule); 
}


module.exports = {
    CreateStudentSubjectSchedule,
}