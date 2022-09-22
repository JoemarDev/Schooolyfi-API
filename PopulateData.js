const StudentData = require('./Mock-Data/Student.json');
const TeacherData = require('./Mock-Data/Teacher.json');
const CourseData = require('./Mock-Data/Courses.json');
const Student = require('./src/model/Student');
const Teacher = require('./src/model/Teacher');

// Populate Student
const CreateStudent = async() => {
    for(const student of  StudentData) {
        await Student.create(student);
    }

    console.log(`Add ${StudentData.length} Students.`);
};

// Populate Teacher
const CreateTeacher = async() => {
    for(const teacher of  TeacherData) {
        await Teacher.create(teacher);
    }
    console.log(`Add ${StudentData.length} Teacher.`);
};


