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
            type: Date,
            default: format(new Date(), 'dddd MMMM Do, YYYY')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionsSchema] 
    }
)

thoughtSchema.virtual('reactionCount').get(() =>{
    return this.reactions.length
})