const mongoose = require('mongoose');

const GradingFormulaSchema = mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Please Provide a type'],
        enum: {
            values: ['attendance', 'quiz', 'exam', 'activity', 'project'],
            message: '{VALUE} is not supported',
        }
    },
    percentage: {
        type: Number,
        required: [true, 'Please provide a percentage']
    }
});

module.exports = mongoose.model('GradingFormula', GradingFormulaSchema);