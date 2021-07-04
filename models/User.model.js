const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        name: String,

        username: {
            type: String,
            // unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        description: String,

        image: String,

        token_confirmation: String,

        email_validation: {
            type: Boolean,
            default: false,
        },

        role: {
            type: String,
            enum: ['GUEST', 'USER', 'HOST', 'ADMIN'],
            default: 'GUEST',
        },
    },

    { timestamps: true }
)

const User = model('User', userSchema)

module.exports = User
