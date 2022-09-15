const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const StudentSchema = mongoose.Schema({
    userName : {
        type : String,
        required : [true , 'Please provide a username'],
        unique : true,
    },
    password : {
        type : String,
        required : [true, 'Please provide a password'],
    },
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

StudentSchema.pre('save', async function() {
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
});

StudentSchema.methods.comparePassword = async function (candidatePassword)  {
    const isMatch = await bcrypt.compare(candidatePassword , this.password);
    return isMatch;
};


module.exports = mongoose.model('Student' , StudentSchema);
