const mongoose = require('mongoose');

const AttendanceSchema = mongoose.Schema({
    student : {
        type : mongoose.Types.ObjectId,
        required : [true , 'Please provide a student'],
    },
    subject : {
        type : mongoose.Types.ObjectId,
        required : [true, 'Please provide a subject'],
    },
    isPresent : {
        type : Boolean,
        default : false,
    },
    isLate : {
        type : Boolean,
        default : false,
    }
},{timestamps : true});

module.exports = mongoose.model('Attendance' , AttendanceSchema);