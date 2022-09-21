const mongoose = require('mongoose');
const { BadRequestError } = require('../errors');

const ExamSchema = mongoose.Schema({
    score: {
        type: Number,
        default: 0,
    },
    totalQuestion: {
        type: Number,
        default: 10,
    },
    average: {
        type: Number,
        default: 0,
    },
    subject: {
        type: mongoose.Types.ObjectId,
        ref: 'Subject',
        required: [true, 'Please provide a score'],
    },
    student: {
        type: mongoose.Types.ObjectId,
        ref: 'Student',
        required: [true, 'Please provide a student'],
    },
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: 'Teacher',
        required: [true, 'Please provide a teacher'],
    },
    type: {
        type: String,
        required: [true, 'Please provide exam type'],
        enum: {
            values: ['quiz', 'exam', 'special-quiz'],
            message: '{VALUE} is not supported'
        }
    }
}, { timestamps: true });


ExamSchema.pre('save', async function () {
    const score = Number(this.score);
    const totalQuestion = (Number(this.totalQuestion));

    if (Number(this.score) > Number(this.totalQuestion)) {
        throw new BadRequestError('The total questions must be greater than score.')
    }

    this.average = Math.round((score / totalQuestion) * 100);
});

module.exports = mongoose.model('Exam', ExamSchema);