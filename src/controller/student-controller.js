const CustomError = require('../errors/index');
const {StatusCodes} = require('http-status-codes');
const Student = require('../model/Student');
const StudentSchedule = require('../model/Student-Schedule');
const Subject = require('../model/Subject');

const {paginateResult} = require('../util');

const getStudents = async(req,res) => {

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

    const students =  Student.find(queryObject).select('-password');
    
    const paginate = await paginateResult({
        p_page : req.query.page , 
        p_limit : req.query.limit , 
        result : students, 
        DataModel:  Student,
        query : queryObject,
    });
    
    
    res.status(StatusCodes.OK).send({
        students : paginate.object , 
        totalStundets : paginate.totalObject , 
        numOfPages : paginate.numOfPages,
        page : req.query.page || 1,
    });

}

const createStudents = async(req,res) => {

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

    const student = await Student.create(req.body);

    res.status(StatusCodes.CREATED).send({student});
}

const getSingleStudent = async(req,res) => {

    const {id:studentId} = req.params;

    const student = await Student.findOne({_id : studentId}).select('-password');

    if(!student) {
        throw new CustomError.NotFoundError(`No student with id ${studentId}`);
    }
    
    res.status(StatusCodes.OK).json({student});

}

const updateStudent = async(req,res) => {

    const {id : studentId} = req.params;

    const student = await Student.findOneAndUpdate(
        {_id : studentId} , 
        req.body , 
        {new : true , runValidators : true}
    );
    
    if(!student) {
        throw new CustomError.BadRequestError(`No student with id ${studentId}`);
    }
    res.status(StatusCodes.OK).json({student});
}

const removeStudent = async(req,res) => {

    const {id : studentId} = req.params;

    const student = await Student.findOne({_id : studentId});

    if(!student) {
        throw new CustomError.BadRequestError(`No student with id ${studentId}`);
    }

    student.remove();

    res.status(StatusCodes.OK).json({msg : 'Student Deleted from the records'});
}

const getStudentSchedule = async(req,res) => {
    const {user_id} = req.user;

    const studentSchedule = await StudentSchedule.find({student : user_id})
        .select('-student')
        .populate({path : 'subjectSchedule' , populate : {
            path : 'teacher',
            select : 'firstName lastName email',
        }})
        .populate({path : 'subjectSchedule' , populate : {
            path : 'subject',
            select : 'name code description',
        }})

    res.status(StatusCodes.OK).json(studentSchedule);
}

const getStudentProfile = async(req,res) => {
    const {user_id} = req.user;

    const student = Student.findOne({_id : user_id}).select('-password');

    if(!student) {
        throw new CustomError.NotFoundError('Student does not exists');
    }

    res.status(StatusCodes.OK).json({student});
}

const GetStudentSubjects = async(req,res) => {

    const {id} = req.params;

    const student = await Student.findOne({_id : id});

    const subjects = await Subject.find({course : student.course});

    res.status(StatusCodes.OK).json(subjects);

}





module.exports = {
    getStudents,
    getSingleStudent,
    updateStudent,
    removeStudent,
    createStudents,
    getStudentSchedule,
    getStudentProfile,
    GetStudentSubjects
}
