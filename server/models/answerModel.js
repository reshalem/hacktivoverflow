const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    content: {
        type: String,
        required: [true, 'answer content must not be empty']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;