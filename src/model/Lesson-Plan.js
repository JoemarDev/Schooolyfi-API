const mongoose = require('mongoose');

const LessonPlanSchema = mongoose.Schema({
    subject : {
        type : mongoose.Types.ObjectId,
        required : [true , 'Please provide a subject'],
    },
    topicName : {
        type : String,
        required : [true , 'Please provide a topic name'],
    },
    description : {
        type : String,
        required : [true , 'Please provide a topic description'],
    },
    isDiscussed : {
        type : Boolean,
        default : false,
    }
},{
    timestamps : true,
});


module.exports = mongoose.model("LessonPlan" , LessonPlanSchema);