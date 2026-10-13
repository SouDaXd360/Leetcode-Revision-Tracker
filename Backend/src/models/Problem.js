const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    leetcodeId: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['Easy', 'Medium', 'Hard'],
    },
    url: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    topics: {
        type: [String],
        required: true,
    }
},{
    timestamps: true
})

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;