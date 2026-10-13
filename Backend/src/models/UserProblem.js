const mongoose = require('mongoose');

const UserProblemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true,
    },
    personalNotes: {
        type: String,
        default: '',
    },
    revisionFrequencyDays: {
        type: Number,
        default: null,
    },
    nextRevisionDate: {
        type: Date,
        default: null,
    }},{
        timestamps: true
})

UserProblemSchema.index(
    { userId: 1, problemId: 1 },
    { unique: true }
)

const UserProblem = mongoose.model('UserProblem', UserProblemSchema);
module.exports = UserProblem;