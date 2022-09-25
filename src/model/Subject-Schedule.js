const mongoose = require('mongoose');

const SubjecScheduleSchema = mongoose.Schema({
    teacher : {
        type : mongoose.Types.ObjectId,
        ref : 'Teacher',
        required : [true , 'Please provide teacherId'],
    },
    subject : {
        type : mongoose.Types.ObjectId,
        ref : 'Subject',
        required : [true, 'Please provide subject'],
    },
    classTimeStart : {
        type : String,
        required : [true , 'Please provide class time start'],
    },
    classTimeDismiss : {
        type : String,
        required : [true , 'Please provide class time dismiss'],
    },
    classTotalConsumeTime : {
        type : Number,
        required : [true , 'Please provide class total consume time'],
    },
}, {timestamps : true},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

SubjecScheduleSchema.virtual('student_schedules' , {
    ref : 'Student_Schedule',
    localField : '_id',
    foreignField : 'subjectSchedule',
    justOne : false,
});

SubjecScheduleSchema.pre('remove' , async function(next)  {
    await this.model('Student_Schedule').deleteMany({subjectSchedule : this._id}); 
});

module.exports = mongoose.model('Subject_Schedule' , SubjecScheduleSchema);
