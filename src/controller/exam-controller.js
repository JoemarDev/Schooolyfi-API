const Exam = require('../model/Exam');
const Student = require('../model/Student');
const Teacher = require('../model/Teacher');
const Subject = require('../model/Subject');
const CustomError = require('../errors');
const {StatusCodes} = require('http-status-codes');

const CreateExamResult = async(req,res) => {

    const {student , subject , teacher } = req.body;
    
    if(!student || !subject || !teacher ) {
        throw new CustomError.BadRequestError('Please provide student , subject , teacher');
    }

    const teacherInformation = await Teacher.findOne({_id : teacher});

    if(!teacherInformation) {
        throw new CustomError.NotFoundError(`No Teacher with id : ${teacher}`);
    }

    const subjectInformation = await Subject.findOne({_id : subject});

    if(!subjectInformation) {
        throw new CustomError.NotFoundError(`No Subject with id : ${subject}`);
    }

    const studentInformation = await Student.findOne({_id : student});

    if(!studentInformation) {
        throw new CustomError.NotFoundError(`No Student with id : ${student}`);
    }
    
    // Check if student have this subjects

    if(studentInformation.course.toString() != subjectInformation.course.toString()) {
        throw new CustomError.BadRequestError('Adding a exam to this subject is not allowed. student must have the course that have this subject.')
    }

    const exam = await Exam.create(req.body);

    res.status(StatusCodes.CREATED).json({exam});
};

const GetAllExamResult = async(req,res) => {

    const exams = await await Exam.find({type : req.body.type});

    res.status(StatusCodes.OK).json({exams});
};

const GetSingleExamResult = async(req,res) => {

    const  {id} = req.params;

    const exam = await Exam.findOne({_id : id , type : req.body.type});

    if(!exam) {
        throw new CustomError.NotFoundError(`No Exam with id : ${id}`);
    }

    res.status(StatusCodes.OK).json({exam});

};

const RemoveExamResult = async(req,res) => {

    const  {id} = req.params;

    const exam = Exam.findOne({_id : id , type : req.body.type});

    if(!exam) {
        throw new CustomError.NotFoundError(`No Exam with id : ${id}`);
    }
    
    await  exam.remove();

    res.send("Exam Remove Successfully.");
};


const UpdateExamResult = async(req,res) => {

    const  {id} = req.params;
    const {score , totalQuestion} = req.body;

    
    const exam = await Exam.findOne({_id : id , type : req.body.type});

    if(!exam) {
        throw new CustomError.NotFoundError(`No Exam with id : ${id}`);
    }

    if(score)  exam.score = score;

    if(totalQuestion)  exam.totalQuestion = totalQuestion;

    if(exam.score > exam.totalQuestion) {
        throw new CustomError.BadRequestError('The total questions must be greater than score.')
    }
    
    await exam.save();

    res.status(StatusCodes.OK).json({exam});

};


module.exports = {
    CreateExamResult,
    GetAllExamResult,
    GetSingleExamResult,
    RemoveExamResult,
    UpdateExamResult
}