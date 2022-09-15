const mongoose = require('mongoose');

const StudentScheduleSchema = mongoose.Schema({
    student : {
        type : mongoose.Types.ObjectId,
        ref : 'Student',
        required : [true , 'Please provide student ID'],
    },
    subjectSchedule : {
        type : mongoose.Types.ObjectId,
        ref : 'Subject_Schedule',
        required : [true , 'Please provide subject schedule'],
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

module.exports = mongoose.model('Student_Schedule' , StudentScheduleSchema);
