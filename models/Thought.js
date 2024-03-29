const { Schema, model } = require('mongoose');
const { format } = require('fecha')
const reactionsSchema = require('./Reactions')



const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
        },
        createdAt: {
            type: String,
            default: format(new Date(), 'dddd MMMM Do, YYYY')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionsSchema]
    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought