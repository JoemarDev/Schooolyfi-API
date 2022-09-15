const { StatusCodes } = require('http-status-codes');
const Subject = require('../model/Subject');
const Teacher = require('../model/Teacher');
const SubjectSchedule = require('../model/Subject-Schedule');
const {ValidateTime , GetTimeDifference , CheckTeacherAvailability} = require('../util');


const AssignSubjectToTeacher = async(req,res) => {
    // Todo
    // Assign a subject to a teacher
    // Check Teacher Availability
    // Create Teacher Subject

    const  {teacher : teacherId , subject : subjectId , classTimeStart , classTimeDismiss } = req.body;

    const isStartValidTime = await ValidateTime(classTimeStart);
    
    if(!isStartValidTime) {
        throw new CustomError.BadRequestError('Class Time Start format not supported. eg - HH:mm)');
    }

    const isDismissValidTime = await ValidateTime(classTimeDismiss);

    if(!isDismissValidTime) {
        throw new CustomError.BadRequestError('Class Time Dismiss format not supported. eg - HH:mm)');
    }

    const teacher = await Teacher.findOne({_id : teacherId});

    if(!teacher) {
        throw new CustomError.NotFoundError(`No Teacher with id ${teacherId}`);
    }

    const subject = await Subject.findOne({_id : subjectId});

    if(!subject) {
        throw new CustomError.NotFoundError(`No Subject with id ${subjectId}`);
    }

    const isAvailable = await CheckTeacherAvailability({teacherId , classTimeStart , classTimeDismiss})

    if(!isAvailable) {
        throw new CustomError.BadRequestError(`Teacher is not available on provide schedule`)
    }

    req.body.classTotalConsumeTime = await GetTimeDifference(classTimeStart , classTimeDismiss);
    
    if(req.body.classTotalConsumeTime < 1) {
        // Get the class total duration (Check if start is less than end)
        throw new CustomError.BadRequestError('Start Time Must be greater than End Time.') 
    }

    const subjectSchedule = await SubjecSchedule.create(req.body);

    res.status(StatusCodes.CREATED).json(subjectSchedule);
}

const FindAvailableTeacherForSubject = async(req,res) => {

    const {subject_id} = req.params;
    const availableTeacher = await SubjectSchedule.find({subject : subject_id})
            .populate({path : 'teacher' , select : 'firstName lastName email' })


    return res.status(StatusCodes.OK).json(availableTeacher);
    

}

const RemoveSubjectToTeacher = async(req,res) => {
    // Delete Records
    res.send("Remove Subject to teacher");
}

const FindSubjectTeacherForStudent = async(req,res) => {
    // Get All Teacher who teaching the subject
    const teacherSubject = await SubjectSchedule.find({});
    res.status(StatusCodes.OK).json({teacherSubject})
}


module.exports = {
    AssignSubjectToTeacher,
    RemoveSubjectToTeacher,
    FindSubjectTeacherForStudent,
    FindAvailableTeacherForSubject
}