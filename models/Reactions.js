const { Schema, model, Types} = require('mongoose');
const { format } = require('fecha')

const reactionsSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: null,
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
    type: String,
    default: () => format(new Date(), 'dddd MMMM Do, YYYY'),
},
    }
)

module.exports = reactionsSchema 