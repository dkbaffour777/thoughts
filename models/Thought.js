const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent thought _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            trim: true,
            maxLength: 280,
            required: "Please add a reaction"
        },
        username: {
            type: String,
            trim: true,
            required: "Please enter your username"
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "Please enter your thought",
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: "Please enter your username"
        },
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// get total count of friends
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
// export the Thought model
module.exports = Thought;