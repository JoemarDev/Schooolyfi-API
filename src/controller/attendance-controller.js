const Student = require('../model/Student');
const Attendance = require('../model/Attendance');
const Subject = require('../model/Subject');
const CustomError = require('../errors');
const {StatusCodes} = require('http-status-codes');

const CreateAttendance = async(req,res) => {
    const {student , subject} = req.body;

    // Check if the student is exists
    const checkStudent = await Student.findOne({_id : student});

    if(!checkStudent) {
        throw new CustomError.NotFoundError(`No stundet with id : ${student}`);
    }

    // Check if the student have already an attendance today
    let start = new Date()
    start.setHours(0,0,0,0);

    let end = new Date()
    end.setHours(23,59,59,999);

    const existAttendance = await Attendance.find(
        {
            student : student ,
            createAt : {$gte : start , $lt : end}
        }
    );

    if(existAttendance.length > 0) {
        throw new CustomError.BadRequestError('Cannot have multiple attendance.')
    }

    // Check if the subject submit is a valid subject
    const isSubjectExists = await Subject.findOne({_id : subject});

    if(!isSubjectExists) {
        throw new CustomError.NotFoundError(`No subject with id : ${subject}`);
    }

    // Checking if the course is have that subject

    let isSubjectOwn = false;

    await isSubjectExists.course.map((item) => {
        if(item.toString() == checkStudent.course.toString()) {
            isSubjectOwn = true;
        }
    });

    if(!isSubjectOwn) {
        throw new CustomError.BadRequestError('Student does not own the subject, unable to create attendace.')
    }
    
    const attendance = await Attendance.create({student : student , subject : subject});
    
    res.status(StatusCodes.CREATED).json({attendance});
};


const RemoveAttendance = async(req,res) => {
    const {id} = req.params;

    const attendance = await Attendance.findOne({_id : id});

    if(!attendance) {
        throw new CustomError.NotFoundError(`No attendance with id : ${id}`);
    }

    await attendance.remove();
    
    res.status(StatusCodes.OK).send("Attendance deleted successfully.");
}

const UpdateAttendace = async(req,res) => {
    
    const {id} = req.params;

    const attendace = await Attendance.findOneAndUpdate(
        {_id : id},
        req.body,
        {new : true , runValidators : true},
    );

    if(!attendace) {
        throw new CustomError.NotFoundError(`No attendance with id : ${id}`);
    }

    res.status(StatusCodes.OK).json({attendace});
    
};

const getSingleAttendace = async(req,res) => {

    const {id} = req.params;

    const attendance = await Attendance.findOne({_id : id});

    if(!attendance) {
        throw new CustomError.NotFoundError(`No attendance with id : ${id}`);
    }

    res.status(StatusCodes.OK).json(attendance);
}

const getAllAttendance = async(req,res) => {

    const attendance = await Attendance.find({});

    res.status(StatusCodes.OK).json({attendance});
}


module.exports = {
    CreateAttendance,
    RemoveAttendance,
    UpdateAttendace,
    getSingleAttendace,
    getAllAttendance,
}