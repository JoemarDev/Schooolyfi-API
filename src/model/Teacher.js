const mongoose = require('mongoose');
const validator = require('validator');
const TeacherSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : [true , 'Please provde student firstname'],
        maxlength : 30,
    },
    middleName : {
        type : String,
        maxlength : 30,
    },
    lastName : {
        type : String,
        required : [true , 'Please provde student lastname'],
        maxlength : 30,
    },
    birtDate : {
        type : Date,
        required : [true , 'Please provde student birthdate'],
    },
    address : {
        type : String,
        required : [true , 'Please provde student address'],
    },
    email : {
        type : String,
        required : [true , 'Please provde student email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        },
        unique: true,
    },
    phoneNumber : {
        type : Number,
        required : [true , 'Please provde student phone number'],
        unique: true,
    },
});


module.exports = mongoose.model('Teacher' , TeacherSchema);