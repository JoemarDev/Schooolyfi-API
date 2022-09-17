const Teacher = require('../model/Teacher');
const SubjectSchedule = require('../model/Subject-Schedule');
const {StatusCodes} = require('http-status-codes');
const {paginateResult} = require('../util');
const CustomError = require('../errors/index');
const StudentSchedule = require('../model/Student-Schedule');


const createTeacher = async(req,res) => {

    const {
        firstName , 
        lastName , 
        middleName , 
        birtDate,
        address , 
        email ,
        phoneNumber
    } = req.body;

    if(!firstName || !lastName || !birtDate || !address || !email || !phoneNumber) {
        throw new CustomError.BadRequestError("Please complete the required fields!");
    }

    const teacher = await Teacher.create(req.body);

    res.status(StatusCodes.CREATED).send({teacher});

};

const getAllTeacher = async(req,res) => {

    const {search} = req.query;

    let queryObject = {};

    if(search) {
        queryObject = {
            $or : [
                {"firstName" : {$regex : search , $options : 'i'}},
                {"lastName" : {$regex : search , $options : 'i'}},
                {"middleName" : {$regex : search , $options : 'i'}},
                {"email" : {$regex : search , $options : 'i'}},
            ]
        }
    }

    const teacher =  Teacher.find(queryObject).select('-password');;
    
    const paginate = await paginateResult({
        p_page : req.query.page , 
        p_limit : req.query.limit , 
        result : teacher, 
        DataModel:  Teacher,
        query : queryObject,
    });
    
    
    res.status(StatusCodes.OK).send({
        teacher : paginate.object , 
        totalStundets : paginate.totalObject , 
        numOfPages : paginate.numOfPages,
        page : req.query.page || 1,
    });

}

const getSingleTeacher = async(req,res) => {

    const {id:teacherId} = req.params;

    const teacher = await Teacher.findOne({_id : teacherId}).select('-password');;

    if(!teacher) {
        throw new CustomError.NotFoundError(`No Teacher with id ${teacherId}`);
    }
    
    res.status(StatusCodes.OK).json({teacher});
}

const updateTeacher = async(req,res) => {
    const {id : teacherId} = req.params;

    const teacher = await Teacher.findOneAndUpdate(
        {_id : teacherId} , 
        req.body , 
        {new : true , runValidators : true}
    );
    
    if(!teacher) {
        throw new CustomError.BadRequestError(`No teacher with id ${teacherId}`);
    }
    res.status(StatusCodes.OK).json({teacher});

}

const removeTeacher = async(req,res) => {
    const {id : teacherId} = req.params;

    const teacher = await Teacher.findOne({_id : teacherId});

    if(!teacher) {
        throw new CustomError.BadRequestError(`No teacher with id ${teacherId}`);
    }

    teacher.remove();

    res.status(StatusCodes.OK).json({msg : 'Teacher Deleted from the records'});

}

const getTeacherProfile = async(req,res) => {
    const {user_id} = req.user;

    const teacher = Teacher.findOne({_id : user_id}).select('-password');;

    if(!teacher) {
        throw new CustomError.NotFoundError('Teacher does not exists');
    }

    res.status(StatusCodes.OK).json({teacher});
}

const getTeacherSchedule = async(req,res) => {
    
    let schedule = await SubjectSchedule.find({teacher : req.user.user_id})
        .populate({path : 'subject' , select : 'name code description'});
    
    res.status(StatusCodes.OK).json(schedule);
}

const GetTeacherStudentLists = async(req , res) => {

    const {id} = req.params;

    const schedule = await SubjectSchedule.findOne({_id : id});

    if(!schedule) {
        throw new CustomError.BadRequestError(`There is no Schedule with id : ${id}`)
    }
    const TeacherStudentsLists = await StudentSchedule.find({subjectSchedule : id})
        .populate({path : 'student' , select : 'firstName lastName email'});

    res.status(StatusCodes.OK).json(TeacherStudentsLists);

}

const RemoveSubjectScheduleFromTeacher = async(req ,res) => {

    const {id} = req.params;

    const TeacherSchedule = await SubjectSchedule.findOne({_id : id});

    if(!TeacherSchedule) {
        throw new CustomError.BadRequestError(`There is no schedule with id : ${id}`);
    }

    await TeacherSchedule.remove();

    res.status(StatusCodes.OK).send("Schedule Remove Successfully");
}

const ChangeAssignTeacherFromTheSchedule = async(req, res) => {
    const {sheduleId , newTeacherId} = req.body;

    if(!sheduleId || !newTeacherId) {
        throw new CustomError.BadRequestError('Please provide Shedule Id and new Teacher ID');
    }
    const TeacherSchedule = await SubjectSchedule.findOne({_id : sheduleId});

    if(!TeacherSchedule) {
        throw new CustomError.NotFoundError(`There is no schedule with id : ${sheduleId}`);
    }

    const teacher = Teacher.findOne({_id : newTeacherId});

    if(!teacher) {
        throw new CustomError.NotFoundError(`There is no teacher with id : ${Teacher}`);
    }

    TeacherSchedule.teacher = newTeacherId;

    await TeacherSchedule.save();

    res.status(StatusCodes.OK).json(TeacherSchedule);

}

module.exports = {
    createTeacher,
    getAllTeacher,
    getSingleTeacher,
    updateTeacher,
    removeTeacher,
    getTeacherSchedule,
    getTeacherProfile,
    GetTeacherStudentLists,
    RemoveSubjectScheduleFromTeacher,
    ChangeAssignTeacherFromTheSchedule
}