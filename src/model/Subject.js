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
} , {timestamps : true});

module.exports = mongoose.model('Subject' , SubjectSchema);
