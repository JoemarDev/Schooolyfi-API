const mongoose = require('mongoose');

const QuizSchema = mongoose.Schema({
    score : {
        type : Number,
        default : 0,
    },
    totalQuestion : {
        type : Number,
        default : 10,
    },
    average : {
        type : Number,
        default : 0,
    },
    subject : {
        type : mongoose.Types.ObjectId,
        ref : 'Subject',
        required : [true , 'Please provide a score'],
    },
    student : {
        type : mongoose.Types.ObjectId,
        ref : 'Student',
        required : [true , 'Please provide a student'],
    },
    teacher : {
        type : mongoose.Types.ObjectId,
        ref : 'Teacher',
        required : [true , 'Please provide a teacher'],
    },
},{timestamps : true});

module.exports = mongoose.model('Quiz' , QuizSchema);