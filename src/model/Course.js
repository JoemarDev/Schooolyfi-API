const mongoose = require('mongoose');
const Subject = require('../model/Subject');

const CourseSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true , 'Please provide a course name'],
    },
    description : {
        type : String,
        default : 'No description provided',
    },
    code : {
        type : String,
        required : [true , 'Please provide a course code'],
    }
});


CourseSchema.virtual('subject' , {
    ref : 'Subject',
    localField : '_id',
    foreignField : 'subject',
    justOne : false,
});

CourseSchema.pre('remove' , async function(next)  {

    const subjects = await this.model('Subject').find({subject : this._id});
    
    for(const subject of subjects) {
        const sub = await Subject.findOne({_id : subject});
        await sub.remove();
    }

});


module.exports = mongoose.model('Course' , CourseSchema);
