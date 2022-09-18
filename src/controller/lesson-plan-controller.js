const LessonPlan = require('../model/Lesson-Plan');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');

const CreateLessonPlan = async(req,res) => {

    const {subject, topicName , description} = req.body;

    if(!subject || !topicName || !description) {
        throw new CustomError.BadRequestError("Please provide subject , topic name , description");
    }

    const lessonPlan = await LessonPlan.create(req.body);

    res.status(StatusCodes.CREATED).json(lessonPlan);

}

const DeleteLessonPlan = async(req,res) => {
    const {id} = req.params;
    const lessonPlan = await LessonPlan.findOne({_id : id});

    if(!lessonPlan) {
        throw new CustomError.NotFoundError(`No Lesson Plan with id : ${id}`);
    }

    await lessonPlan.remove();

    res.send("Lesson Plan Deleted");
};

const UpdateLessonPlan = async(req,res) => {
    const  {id} = req.params;
    const lessonPlan =   await LessonPlan.findOneAndUpdate(
        {_id : id},
        req.body,
        {new : true , runValidators : true}
    );

    res.status(StatusCodes.OK).json(lessonPlan);
};


const GetAllLessonPlan = async(req,res) => {
    const lessonPlan = await LessonPlan.find({});
    res.status(StatusCodes.OK).json(lessonPlan);
};

const GetLessonPlanDetails = async(req,res) => {

    const {id} = req.params;
    const lessonPlan = await LessonPlan.findOne({_id : id});

    if(!lessonPlan) {
        throw new CustomError.NotFoundError(`No Lesson Plan with id : ${id}`);
    }

    res.status(StatusCodes.OK).json(lessonPlan);

}



module.exports = {
    CreateLessonPlan,
    DeleteLessonPlan,
    UpdateLessonPlan,
    GetAllLessonPlan,
    GetLessonPlanDetails
}