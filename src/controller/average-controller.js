const Subject = require('../model/Subject');
const Student = require('../model/Student');
const CustomError = require('../errors');
const GradingFormula = require('../model/GradingFormula');

const { StatusCodes } = require('http-status-codes');

const { ComputeSubjectAttendance, GetAverageFormula , ComputeExamAndQuiz , ComputeProjectAndActivity } = require('../util');

const GetSubjectAverage = async (req, res) => {

    const { student: studentId, subject: subjectId } = req.body;

    if (!studentId || !subjectId) {
        throw new CustomError.BadRequestError('Please provide a student and subject');
    }

    const student = await Student.findOne({ _id: studentId });

    if (student.length == 0) {
        throw new CustomError.NotFoundError(`No Student with id :${studentId}`)
    }

    const subject = await Subject.findOne({ _id: subjectId });

    if (subject.length == 0) {
        throw new CustomError.NotFoundError(`No Subject with id :${subjectId}`)
    }


    if (student.course.toString() != subject.course.toString()) {
        throw new CustomError.BadRequestError('This subject is not related to student.');
    }


    let averageInformation = {};

    const QuizAndExam = await ComputeExamAndQuiz({ subjectId, studentId});
    const ActivityAndProject = await ComputeProjectAndActivity({ subjectId, studentId});

    averageInformation['attendance'] = await ComputeSubjectAttendance({ subjectId, studentId });
    averageInformation['quiz'] = {total : QuizAndExam['total-quiz']  , average : QuizAndExam['quiz-average']};
    averageInformation['exam'] = {total : QuizAndExam['total-exams']  , average : QuizAndExam['exam-average']};
    averageInformation['project'] = {total : ActivityAndProject['total-project']  , average : ActivityAndProject['project-average']};
    averageInformation['activity'] = {total : ActivityAndProject['total-activity']  , average : ActivityAndProject['activity-average']};

  
    const formula = await GetAverageFormula();

    const totalSubjectAverage =
        (averageInformation['attendance']['average'] * Number(formula['attendance'])) +
        (averageInformation['quiz']['average'] * Number(formula['quiz'])) +
        (averageInformation['exam']['average'] * Number(formula['exam'])) +
        (averageInformation['project']['average'] * Number(formula['project'])) +
        (averageInformation['activity']['average'] * Number(formula['activity']));

    res.status(StatusCodes.OK).json({ averageInformation, totalSubjectAverage });

}


const GetStudentTotalAverage = async (req, res) => {
    const {studentId} = req.params;

    const student = await Student.findOne({_id : studentId});

    if(!student) {
        throw new CustomError.NotFoundError(`No student with id : ${studentId}`);
    }


    const subjects = await Subject.find({course : student.course});
    
    let subjectsAverage = [];

    for(const subject of subjects) {

        let averageInformation = {};

        let  subjectId = subject['_id'];
        
        const QuizAndExam = await ComputeExamAndQuiz({ subjectId, studentId});
        const ActivityAndProject = await ComputeProjectAndActivity({ subjectId, studentId});

        averageInformation['attendance'] = await ComputeSubjectAttendance({ subjectId, studentId });
        averageInformation['quiz'] = {total : QuizAndExam['total-quiz']  , average : QuizAndExam['quiz-average']};
        averageInformation['exam'] = {total : QuizAndExam['total-exams']  , average : QuizAndExam['exam-average']};
        averageInformation['project'] = {total : ActivityAndProject['total-project']  , average : ActivityAndProject['project-average']};
        averageInformation['activity'] = {total : ActivityAndProject['total-activity']  , average : ActivityAndProject['activity-average']};

        const formula = await GetAverageFormula();

        const totalSubjectAverage =
            (averageInformation['attendance']['average'] * Number(formula['attendance'])) +
            (averageInformation['quiz']['average'] * Number(formula['quiz'])) +
            (averageInformation['exam']['average'] * Number(formula['exam'])) +
            (averageInformation['project']['average'] * Number(formula['project'])) +
            (averageInformation['activity']['average'] * Number(formula['activity']));

        subjectsAverage = [...subjectsAverage , {subject : {name : subject.name , code : subject.code}  , totalSubjectAverage}];
    }

    res.status(StatusCodes.OK).json({subjectsAverage});
}

module.exports = {
    GetSubjectAverage,
    GetStudentTotalAverage
}