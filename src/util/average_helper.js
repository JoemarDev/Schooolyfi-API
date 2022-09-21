const Attendance = require('../model/Attendance');
const Exam = require('../model/Exam');
const Project = require('../model/Project');
const GradingFormula = require('../model/GradingFormula');
const ComputeSubjectAttendance = async ({ subjectId, studentId }) => {

    // Compute the attendance average
    const attendanceLists = await Attendance.find({ subject: subjectId, student: studentId });

    let absent = 0;
    let present = 0;
    let late = 0;

    for (const attendance of attendanceLists) {
        if (attendance.isPresent) {
            if (attendance.isLate) {
                present++;
            } else {
                absent++;
            }
        } else {
            absent++;
        }
    }

    return {
        'present': present,
        'absent': absent,
        'late': late,
        'average': (present / attendanceLists.length) * 100,
    };

}

const ComputeExamOrQuiz = async ({ subjectId, studentId, type }) => {
    const exams = await Exam.find({
        subject: subjectId,
        student: studentId,
        type: type,
    });


    let totalAverage = 0;
    for (const exam of exams) {
        totalAverage += exam.average;
    }

    return {
        'total': exams.length,
        'average': Math.round(totalAverage / exams.length),
    }

};

const ComputeProjectOrActivity = async ({ subjectId, studentId, type }) => {

    const projects = await Project.find({
        subject: subjectId,
        student: studentId,
        type: type,
    });

    let totalAverage = 0;

    for (const project of projects) {
        totalAverage += project.grade;
    }

    return {
        'total': projects.length,
        'average': Math.round(totalAverage / projects.length)
    }

};

const GetAverageFormula = async () => {

    const gradingFormulas = await GradingFormula.find({});

    let attendance = 0;
    let quiz = 0;
    let exam = 0;
    let activity = 0;
    let project = 0;

    for (const gradingFormula of gradingFormulas) {
        if (gradingFormula['type'] == 'attendance')
            attendance = gradingFormula['percentage'] / 100;

        if (gradingFormula['type'] == 'quiz')
            quiz = gradingFormula['percentage'] / 100;

        if (gradingFormula['type'] == 'exam')
            exam = gradingFormula['percentage'] / 100;

        if (gradingFormula['type'] == 'activity')
            activity = gradingFormula['percentage'] / 100;

        if (gradingFormula['type'] == 'project')
            project = gradingFormula['percentage'] / 100;
    }

    return { attendance, quiz, exam, activity, project };

}



module.exports = {
    ComputeSubjectAttendance,
    ComputeExamOrQuiz,
    ComputeProjectOrActivity,
    GetAverageFormula
}