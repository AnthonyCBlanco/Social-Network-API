const { Schema, model } = require('mongoose');
const { format } = require('fecha')

const reactionsSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: new Schema.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: format(new Date(), 'dddd MMMM Do, YYYY')
        },
    }
)

module.exports = { reactionsSchema }