const CustomError = require('../errors/index');
const {StatusCodes} = require('http-status-codes');
const Student = require('../model/Student');

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

    const students =  Student.find(queryObject);
    
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

    const student = await Student.findOne({_id : studentId});

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


module.exports = {
    getStudents,
    getSingleStudent,
    updateStudent,
    removeStudent,
    createStudents
}
