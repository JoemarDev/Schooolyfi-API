const mongoose = require('mongoose');

const ClassScheduleSchema = mongoose.Schema({
    student : {
        type : mongoose.Types.ObjectId,
        ref : 'Student',
        required : [true , 'Please provide student ID'],
    },
    teacher : {
        type : mongoose.Types.ObjectId,
        ref : 'Teacher',
        required : [true , 'Please provide teacher ID'],
    },
    subject : {
        type : mongoose.Types.ObjectId,
        ref : 'Subject',
        required : [true , 'Please provide Subject ID'],
    },
    time : {
        type : String,
        required : [true , 'Please provide time schedule'],
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

module.exports = mongoose.model('ClassSchedule' , ClassScheduleSchema);
