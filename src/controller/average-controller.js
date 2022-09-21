const Subject = require('../model/Subject');
const Student = require('../model/Student');
const CustomError = require('../errors');
const GradingFormula = require('../model/GradingFormula');

const { StatusCodes } = require('http-status-codes');

const { ComputeSubjectAttendance, ComputeExamOrQuiz, ComputeProjectOrActivity, GetAverageFormula } = require('../util');

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

    averageInformation['attendance'] = await ComputeSubjectAttendance({ subjectId, studentId });
    averageInformation['quiz'] = await ComputeExamOrQuiz({ subjectId, studentId, type: 'quiz' });
    averageInformation['exam'] = await ComputeExamOrQuiz({ subjectId, studentId, type: 'exam' });
    averageInformation['project'] = await ComputeProjectOrActivity({ subjectId, studentId, type: 'project' });
    averageInformation['activity'] = await ComputeProjectOrActivity({ subjectId, studentId, type: 'activity' });

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
    res.send("Get Student Total Average");
}

module.exports = {
    GetSubjectAverage,
    GetStudentTotalAverage
}