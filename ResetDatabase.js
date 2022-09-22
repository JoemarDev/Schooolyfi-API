require('dotenv').config();
const Student = require('./src/model/Student');
const Teacher = require('./src/model/Teacher');
const Subject = require('./src/model/Subject');
const ClassSchedule = require('./src/model/Student-Schedule');
const Course = require('./src/model/Course');

const connectDB = require('./src/database/connection');

const ResetDatabase = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Course.deleteMany({} , console.log("Course Remove Successfully"));
        await Student.deleteMany({} ,console.log("Student Collection Deleted!"));
        await Teacher.deleteMany({} ,console.log("Teacher Collection Deleted!"));
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

ResetDatabase();