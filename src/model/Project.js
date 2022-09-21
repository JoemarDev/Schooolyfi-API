const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    subject: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide a subject'],
    },
    student: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide a student'],
    },
    grade: {
        type: Number,
        required: [true, 'Please provide a grade'],
    },
    type: {
        type: String,
        required: ['Please provide a type'],
        enum: {
            values: ['project', 'activity'],
            message: '{VALUE} is not supported'
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);