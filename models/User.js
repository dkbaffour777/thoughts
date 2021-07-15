const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: "Please enter your username",
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (email) {
                    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);
                },
                message: props => `${props.value} is not a valid email address!`
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

UserSchema.path('username').validate(async (username) => {
    const usernameCount = await mongoose.models.User.countDocuments({ username });
    return !usernameCount;
}, 'Username already exists');

UserSchema.path('email').validate(async (email) => {
    const emailCount = await mongoose.models.User.countDocuments({ email });
    return !emailCount;
}, 'Email already exists');


// create the User model using the UserSchema
const User = model('User', UserSchema);

// get total count of friends
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
// export the User model
module.exports = User;