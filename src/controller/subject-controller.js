const CustomError = require('../errors');
const Subject = require('../model/Subject');
const LessonPlan = require('../model/Lesson-Plan');
const { StatusCodes } = require('http-status-codes');

const createSubject = async(req,res) => {
    const subject = await Subject.create(req.body);
    res.status(StatusCodes.CREATED).json({subject});
}

const getAllSujects = async(req,res) => {

    const subjects = await Subject.find({});
    res.status(StatusCodes.OK).json({subjects});
}

const getSingleSubjects = async(req,res) => {
    
    const {id : subjectId} = req.params;

    const subject = await Subject.findOne({_id : subjectId});

    if(!subject) {
        throw new CustomError.NotFoundError(`No Subject with id ${subjectId}`);
    }

    res.status(StatusCodes.OK).json(subject);
}

const updateSubject = async(req,res) => {

    const {id : subjectId} = req.params;

    const subject = await Subject.findOneAndUpdate(
        {_id : subjectId} , 
        req.body , 
        {new : true , runValidators : true}
    );
    
    if(!subject) {
        throw new CustomError.BadRequestError(`No subject with id ${subjectId}`);
    }
    res.status(StatusCodes.OK).json({subject});
}

const removeSubject = async(req,res) => {

    const {id : subjectId} = req.params;

    const subject = await Subject.findOne({_id : subjectId});

    if(!subject) {
        throw new CustomError.NotFoundError(`No Subject with id ${subjectId}`);
    }

    subject.remove();
    
    res.status(StatusCodes.OK).send("Remove Subject");
}

const GetSubjectLessonPlan = async(req,res) => {
    const {id} = req.params;
    const lessonPlans = await LessonPlan.find({subject : id});
    res.status(StatusCodes.OK).json(lessonPlans);
}

module.exports = {
    createSubject,
    getAllSujects,
    getSingleSubjects,
    updateSubject,
    removeSubject,
    GetSubjectLessonPlan
}