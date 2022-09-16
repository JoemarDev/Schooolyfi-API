const StudentSchedule = require('../model/Student-Schedule');
const SubjectSchedule = require('../model/Subject-Schedule');
const Teacher = require('../model/Teacher');
const Subject = require('../model/Subject');

const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');


const {
    CheckStudentAvailability ,
    ValidateTime , 
    GetTimeDifference , 
    CheckTeacherAvailability
} = require('../util');


const CreateStudentSubjectSchedule = async(req,res) => {

    const {subjectSchedule} = req.body;

    if(!subjectSchedule) {
        throw new CustomError.BadRequestError('Please provide a subject schedule id');
    }

    const Schedule = await SubjectSchedule.findOne({_id : subjectSchedule});

    if(!Schedule) {
        throw new CustomError.BadRequestError('This Schedule does not exits');
    }

    const isAlreadyHaveTheSubject = await StudentSchedule.findOne({subjectSchedule});

    if(isAlreadyHaveTheSubject) {
        throw new CustomError.BadRequestError("Student already have this subject. Please select another one.")
    }

    req.body.student = req.user.user_id;
    
    const isStudentAvailable = await CheckStudentAvailability({
        studentId : req.user.user_id , 
        classTimeStart : Schedule.classTimeStart , 
        classTimeDismiss : Schedule.classTimeDismiss,
    });

    if(!isStudentAvailable) {
        throw new CustomError.BadRequestError(`Student is not available on provide schedule`)
    }

    const studentSchedule = await StudentSchedule.create(req.body);

    res.status(StatusCodes.CREATED).json(studentSchedule); 
}

const DeleteStudentSubjectSchedule = async(req , res) => {
    const {schedule_id : subjectSchedule} = req.params;

    const schedule = await StudentSchedule.findOne({subjectSchedule});

    if(!schedule) {
        throw new CustomError.BadRequestError(`No Shedule with ID : ${subjectSchedule}`);
    }

    await schedule.remove();

    res.status(StatusCodes.OK).json({msg : 'Shedule Remove From Successfully.'});

};

const ChangeStudentSubjectSchedule = async(req,res) => {

    const {schedule_id} = req.params;
    const {subjectSchedule} = req.body;

    if(!subjectSchedule) {
        throw new CustomError.BadRequestError('Please provide a subject schedule id');
    }

    const isAlreadyHaveTheSubject = await StudentSchedule.findOne({subjectSchedule});

    if(isAlreadyHaveTheSubject) {
        throw new CustomError.BadRequestError("Cannot update with the same schedule.")
    }

    const ToUpdateSchedule  = await SubjectSchedule.findOne({_id :subjectSchedule});
    
    if(!ToUpdateSchedule) {
        throw new CustomError.BadRequestError('This Schedule does not exits');
    }

    const ReplacementSchedule = await StudentSchedule.findOne({_id : schedule_id});

    if(!ReplacementSchedule) {
        throw new CustomError.BadRequestError('Cannot replace schedule with invalid shedule');
    }

    ReplacementSchedule.subjectSchedule = subjectSchedule;

    await ReplacementSchedule.save();

    const NewScheduleInformation =  await SubjectSchedule.findOne({_id : subjectSchedule})
        .populate({path : 'teacher' , select : 'firstName lastName email' });;


    res.status(StatusCodes.OK).json(NewScheduleInformation);
    
};

const AssignSubjectToTeacher = async(req,res) => {

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

    const subjectSchedule = await SubjectSchedule.create(req.body);

    res.status(StatusCodes.CREATED).json(subjectSchedule);
};

const FindAvailableTeacherForSubject = async(req,res) => {

    const {subject_id} = req.params;
    const availableTeacher = await SubjectSchedule.find({subject : subject_id})
            .populate({path : 'teacher' , select : 'firstName lastName email' })

    return res.status(StatusCodes.OK).json(availableTeacher);

};

const GetScheduleInformation = async(req,res) => {
    const {schedule_id} = req.params;

    const scheduleInformation = await StudentSchedule.findOne({_id : schedule_id})
    .select('-student')
    .populate({path : 'subjectSchedule' , populate : {
        path : 'teacher',
        select : 'firstName lastName email',
    }})
    .populate({path : 'subjectSchedule' , populate : {
        path : 'subject',
        select : 'name code description',
    }})

    if(!scheduleInformation) {
        throw new CustomError.NotFoundError(`No Schedule with id : ${schedule_id}`);
    }

    res.status(StatusCodes.OK).json(scheduleInformation)
}



module.exports = {
    CreateStudentSubjectSchedule,
    DeleteStudentSubjectSchedule,
    FindAvailableTeacherForSubject,
    AssignSubjectToTeacher,
    ChangeStudentSubjectSchedule,
    GetScheduleInformation
}
