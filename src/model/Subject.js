const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true , 'Please provide a subject name'],
    },
    code : {
        type : String ,
        required : [true , 'Please provide a subject code'],
        unique : true,
    },
    description : {
        type : String,
        default : "No Description Provided",
    },
    courses : {
        type : [mongoose.Types.ObjectId],
        ref : 'Course',
        require : [true , 'Please provide a course for this subject'],
    },
} , {timestamps : true});


SubjectSchema.virtual('subject_schedules' , {
    ref : 'Subject_Schedule',
    localField : '_id',
    foreignField : 'subject',
    justOne : false,
});


SubjectSchema.virtual('lesson_plan' , {
    ref : 'LessonPlan',
    localField : '_id',
    foreignField : 'lesson_plan',
    justOne : false,
});


SubjectSchema.virtual('exam' , {
    ref : 'Exam',
    localField : '_id',
    foreignField : 'exam',
    justOne : false,
});


SubjectSchema.virtual('project' , {
    ref : 'Project',
    localField : '_id',
    foreignField : 'project',
    justOne : false,
});

SubjectSchema.virtual('attendance' , {
    ref : 'Attendance',
    localField : '_id',
    foreignField : 'attendance',
    justOne : false,
});


SubjectSchema.pre('remove' , async function(next)  {
    await this.model('Subject_Schedule').deleteMany({subject : this._id}); 
    await this.model('LessonPlan').deleteMany({lesson_plan : this._id}); 
    await this.model('Exam').deleteMany({exam : this._id}); 
    await this.model('Project').deleteMany({project : this._id}); 
    await this.model('Attendance').deleteMany({attendance : this._id}); 
});



module.exports = mongoose.model('Subject' , SubjectSchema);
