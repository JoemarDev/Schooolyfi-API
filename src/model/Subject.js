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
    course : {
        type : mongoose.Types.ObjectId,
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


SubjectSchema.pre('remove' , async function(next)  {
    await this.model('Subject_Schedule').deleteMany({subject : this._id}); 
});


module.exports = mongoose.model('Subject' , SubjectSchema);
