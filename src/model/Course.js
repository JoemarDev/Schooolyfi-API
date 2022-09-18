const mongoose = require('mongoose');

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

module.exports = mongoose.model('Course' , CourseSchema);
