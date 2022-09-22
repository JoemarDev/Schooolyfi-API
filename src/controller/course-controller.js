const Course = require('../model/Course');
const Subject = require('../model/Subject');
const Student = require('../model/Student');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');

const getAllCourse = async(req,res) => {
    const courses = await Course.find({});
    res.status(StatusCodes.OK).send(courses);
};

const createCourse = async(req,res) => {
    
    const {name , code} = req.body;

    if(!name || !code) {
        throw new CustomError.BadRequestError('Please provide a course name , course code');
    }

    const course = await Course.create(req.body);

    res.status(StatusCodes.CREATED).json({course});
}

const getCourseInformation = async(req,res) => {
    const{id} = req.params;

    const course = await Course.findOne({_id : id});

    if(!course) {
        throw new CustomError.BadRequestError(`No Course with id : ${id}`);
    }

    res.status(StatusCodes.OK).send(course);
};

const getAllCourseSubject = async(req,res) => {
    const {id} = req.params;

    const subjects = await Subject.find({course : id});

    res.status(StatusCodes.OK).json({subjects});

};

const updateCourseInformation = async(req,res) => {

    const{id} = req.params;

    const course = await Course.findOneAndUpdate(
        {_id : id},
        req.body,
        {new : true , runValidators : true}
    );
    
    if(!course) {
        throw new CustomError.NotFoundError(`No course with id : ${id}`);
    }

    res.status(StatusCodes.OK).json(course);
};

const removeCourse = async (req,res) => { 

    const{id} = req.params;

    const course = await Course.findOne({_id : id});

    if(!course) {
        throw new CustomError.BadRequestError(`No Course with id : ${id}`)
    }

    await course.remove();
    
    res.status(StatusCodes.OK).send("Course Remove Succefully.");
};

const GetAllStudentsWhoTakeTheCourse = async(req,res) => {
    const {id} = req.params;

    const Students = await Student.find({course : id})
        .select('-password');
        
    res.status(StatusCodes.OK).json({Students})
}


module.exports = {
    getAllCourse,
    getCourseInformation,
    getAllCourseSubject,
    updateCourseInformation,
    removeCourse,
    createCourse,
    GetAllStudentsWhoTakeTheCourse

}

