const StudentSchedule = require('../model/Student-Schedule');
const SubjectSchedule = require('../model/Subject-Schedule');

const CustomError = require('../errors');
const moment = require('moment');

const CheckStudentAvailability = async({studentId , classTimeStart , classTimeDismiss }) => {

    if(!studentId || !classTimeStart || !classTimeDismiss) {
        throw new CustomError.BadRequestError('Please provide Student ID and Time Schedule');
    }

    
    const scheduleLists = await StudentSchedule.find({student : studentId});

    let isAvailable = true;
    
    for(const sched of scheduleLists) {

        const subjectSchedule = await SubjectSchedule.findOne({_id : sched.subjectSchedule.toString()})

        if(subjectSchedule) {

            const StartTime =  moment(subjectSchedule.classTimeStart , [moment.ISO_8601, 'HH:mm']);

            const EndTime = moment(subjectSchedule.classTimeDismiss , [moment.ISO_8601, 'HH:mm']);

            const newSchedStart = moment(classTimeStart , [moment.ISO_8601, 'HH:mm']);

            const newSchedEnd = moment(classTimeDismiss , [moment.ISO_8601, 'HH:mm']);

            if(newSchedStart.isBetween(StartTime , EndTime) || StartTime.isSame(newSchedStart)) {
                return isAvailable = false;
            }

            if(newSchedEnd.isBetween(StartTime , EndTime) || newSchedEnd.isSame(EndTime)) {
                return isAvailable = false;
            }
        }
    }

    return isAvailable;

}

const CheckTeacherAvailability = async({teacherId , classTimeStart , classTimeDismiss }) => {

    if(!teacherId || !classTimeStart || !classTimeDismiss) {
        throw new CustomError.BadRequestError('Please provide Teacher ID and Time Schedule');
    }
    
    const scheduleLists = await SubjectSchedule.find({teacher : teacherId});

    let isAvailable = true;
    
    for(const sched of scheduleLists) {

        const StartTime =  moment(sched.classTimeStart , [moment.ISO_8601, 'HH:mm']);

        const EndTime = moment(sched.classTimeDismiss , [moment.ISO_8601, 'HH:mm']);

        const newSchedStart = moment(classTimeStart , [moment.ISO_8601, 'HH:mm']);

        const newSchedEnd = moment(classTimeDismiss , [moment.ISO_8601, 'HH:mm']);

        if(newSchedStart.isBetween(StartTime , EndTime) || StartTime.isSame(newSchedStart)) {
            return isAvailable = false;
        }

        if(newSchedEnd.isBetween(StartTime , EndTime) || newSchedEnd.isSame(EndTime)) {
            return isAvailable = false;
        }

    }

    return isAvailable;
}

const ValidateTime = async(time) => {
    const formats = [
        "HH:mm",
        "HH:mm"
    ];

    return moment(time, formats, true).isValid();

};

const GetTimeDifference = async(s,e) => {

    const Start = moment(s , [moment.ISO_8601, 'HH:mm']);
    const End = moment(e, [moment.ISO_8601, 'HH:mm']);
    const diff = await moment.duration(End.diff(Start));

    if(isNaN(diff)) {
        throw new CustomError.BadRequestError('You pass a wrong time value time hours must be 0-24 , minutes must be 0-60')
    }

    return diff.asMinutes();
}

module.exports = {
    CheckStudentAvailability,
    CheckTeacherAvailability,
    ValidateTime,
    GetTimeDifference
}