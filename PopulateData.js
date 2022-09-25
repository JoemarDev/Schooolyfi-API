const StudentData = require('./Mock-Data/Student.json');
const TeacherData = require('./Mock-Data/Teacher.json');
const CourseData = require('./Mock-Data/Courses.json');
const SubjectData = require('./Mock-Data/Subject.json');
const Student = require('./src/model/Student');
const Teacher = require('./src/model/Teacher');
const Course = require('./src/model/Course');
const Subject = require('./src/model/Subject');
const SubjecScheduleSchema = require('./src/model/Subject-Schedule');
const StudentSchedule = require('./src/model/Student-Schedule');
const SubjectSchedule = require('./src/model/Subject-Schedule');
require('dotenv').config();

// Database
const connectDB = require('./src/database/connection');

// Populate Student
const CreateStudent = async() => {
    for(const student of  StudentData) {

        student.password = '1234';
        
        const CourseCount = await Course.countDocuments();
        
        let randomCourse = Math.floor(Math.random() * CourseCount);

        const course = await Course.findOne().skip(randomCourse);

        student.course = course;

        await Student.create(student);
    }
    console.log(`Add ${StudentData.length} Students.`);
};

// Populate Teacher
const CreateTeacher = async() => {
    for(const teacher of  TeacherData) {
        teacher.password = '1234';
        await Teacher.create(teacher);
    }
    console.log(`Add ${StudentData.length} Teacher.`);
};


// Populate Course
const CreateCourse = async() => {
    for(const course of CourseData) {
        await Course.create(course);
    }
    console.log(`Add ${CourseData.length} Course.`);
}


const CreateSubject = async() => {

    const courses = await Course.find({}).select('_id');

    for(const subject of SubjectData) {
        subject.courses = courses;
        await Subject.create(subject);
    }

    console.log(`Add ${CourseData.length} Subject.`);
}


const AssignScheduleToTeacher = async() => {
    
    const teachers = await Teacher.find({});
    const subjects = await Subject.find({});
    
    const ScheduleLists = [
        {
            classTimeStart : "13:00",
            classTimeDismiss : "14:30",
            classTotalConsumeTime : 30,
        },
        {
            classTimeStart : "14:20",
            classTimeDismiss : "15:50",
            classTotalConsumeTime : 70,
        },
        {
            classTimeStart : "16:10",
            classTimeDismiss : "17:50",
            classTotalConsumeTime : 60,
        },
        {
            classTimeStart : "18:10",
            classTimeDismiss : "19:50",
            classTotalConsumeTime : 60,
        }
    ];

    let scheduleList  = [];


    for(const teacher of teachers) {
        for(const subject of subjects) {

            let randomSched  = ScheduleLists[Math.floor(Math.random() * ScheduleLists.length)]
            let data = {
                    "teacher" : teacher._id,
                    "subject" : subject._id,
                    "classTimeStart" : randomSched['classTimeStart'],
                    "classTimeDismiss" : randomSched['classTimeDismiss'],
                    "classTotalConsumeTime" : randomSched['classTotalConsumeTime']
                }

            scheduleList = [...scheduleList , data];
        }
    }

    await SubjecScheduleSchema.insertMany(scheduleList);

    console.log(`Inserted ${scheduleList.length} Teacher Schedule`);
}

const CreateStudentSchedule = async() => {
    const students = await Student.find({});

    let scheduleList = [];
    for(student of students) {
        const subjects = await Subject.find({course : student.course});
        for(const subject of subjects) {
            const availableTeacher = await SubjectSchedule.find({subject : subject._id});
            const RandomTeacher = Math.floor(Math.random() * availableTeacher.length);
            let data = {
                "subjectSchedule": availableTeacher[RandomTeacher]._id,
                "student" : student._id
            }
            scheduleList = [...scheduleList , data]
        }
    }

    await StudentSchedule.insertMany(scheduleList);

    console.log(`Inserted ${scheduleList.length} Student Schedule`);

};

const Start = async() => {
    await connectDB(process.env.MONGO_URI);    
    await CreateCourse();
    await CreateTeacher();
    await CreateStudent();
    await CreateSubject();
    await AssignScheduleToTeacher();
    await CreateStudentSchedule();
    process.exit(0);
};

Start();