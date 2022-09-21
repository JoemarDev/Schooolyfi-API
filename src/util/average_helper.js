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

const ComputeExamAndQuiz = async({ subjectId, studentId }) => {
    const exams = await Exam.find({
        subject: subjectId,
        student: studentId,
    });

    let examTotalAverage = 0;
    let totalExam = 0;
    let quizTotalAverage = 0;
    let totalQuiz = 0;

    for (const exam of exams) {
        if(exam.type == 'exam') {
            totalExam++;
            examTotalAverage += exam.average;
        }

        if(exam.type == 'quiz') {
            totalQuiz++;
            quizTotalAverage += exam.average;
        }
    }

    return {
        'total-exams' : totalExam,
        'exam-average' :  Math.round(examTotalAverage / totalExam),
        'total-quiz' : totalQuiz,
        'quiz-average' :  Math.round(quizTotalAverage / totalQuiz),
    }
    
}

const ComputeProjectAndActivity =  async ({ subjectId, studentId}) => {

    const projects = await Project.find({
        subject: subjectId,
        student: studentId,
    });

   
    let projectTotalAverage = 0;
    let totalProject = 0;
    let activityTotalAverage = 0;
    let totalActivity = 0;


    for (const project of projects) {

        if(project.type == 'project') {
            totalProject++;
            projectTotalAverage += project.grade;
        }

        if(project.type == 'activity') {
            totalActivity++;
            activityTotalAverage += project.grade;
        }

    }


    return {
        'total-project' : totalProject,
        'project-average' :  Math.round(projectTotalAverage / totalProject),
        'total-activity' : totalActivity,
        'activity-average' :  Math.round(activityTotalAverage / totalActivity),
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
    GetAverageFormula,
    ComputeExamAndQuiz,
    ComputeProjectAndActivity
}