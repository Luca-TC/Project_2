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

        address: {
            road: String,
            number: Number,
            city: String,
            state: String,
        },

        token_confirmation: String,

        role: {
            type: String,
            enum: ['PENDING', 'USER', 'HOST', 'ADMIN'],
            default: 'PENDING',
        },
    },

    { timestamps: true }
)

const User = model('User', userSchema)

module.exports = User
