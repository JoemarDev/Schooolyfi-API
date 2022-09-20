const Subject = require('../model/Subject');
const Student = require('../model/Student');
const CustomError = require('../errors');
const Attendance = require('../model/Attendance');
const { StatusCodes } = require('http-status-codes');

const {ComputeSubjectAttendance , ComputeExamOrQuiz , ComputeProjectOrActivity} = require('../util');

const GetSubjectAverage = async(req,res) => {

    const {student:studentId , subject : subjectId} = req.body;

    if(!studentId || !subjectId) {
        throw new CustomError.BadRequestError('Please provide a student and subject');
    }

    const student = await Student.findOne({_id : studentId});

    if(student.length == 0) {
        throw new CustomError.NotFoundError(`No Student with id :${studentId}`)
    }

    const subject = await Subject.findOne({_id : subjectId});

    if(subject.length == 0) {
        throw new CustomError.NotFoundError(`No Subject with id :${subjectId}`)
    }
    

    if(student.course.toString() != subject.course.toString()) {
        throw new CustomError.BadRequestError('This subject is not related to student.');
    }


    let averageInformation = {};

    averageInformation['attendance'] = await ComputeSubjectAttendance({subjectId , studentId});
    averageInformation['quiz'] = await ComputeExamOrQuiz({subjectId , studentId , type : 'quiz'});
    averageInformation['exam'] = await ComputeExamOrQuiz({subjectId , studentId , type : 'exam'});
    averageInformation['project'] = await ComputeProjectOrActivity({subjectId , studentId , type : 'project'});
    averageInformation['activiy'] = await ComputeProjectOrActivity({subjectId , studentId , type : 'activiy'});
    
    const totalSubjectAverage = 
    (averageInformation['attendance']['average'] * 0.10) +  
    (averageInformation['quiz']['average'] * 0.15) +  
    (averageInformation['exam']['average'] * 0.40) +  
    (averageInformation['project']['average'] * 0.20) +  
    (averageInformation['activiy']['average'] * 0.10);


    res.status(StatusCodes.OK).json({averageInformation, totalSubjectAverage});
    
}


const GetStudentTotalAverage = async(req,res) => {
    res.send("Get Student Total Average");
}

module.exports = {
    GetSubjectAverage,
    GetStudentTotalAverage
}