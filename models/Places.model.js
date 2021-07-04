const { Schema, model } = require('mongoose')

const placeSchema = new Schema(
    {
        place_name: {
            type: String,
            required: true,
            unique: true,
        },

        description: {
            name_description: String,
            task: {
                task_time: Number,
                task_description: String,
            },
            //  required: true,
        },
        direction: {
            type: String,
            required: true,
        },

        number_rooms: {
            type: Number,
            required: true,
        },

        user_applicant: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],

        image: {
            required: true,
            type: String,
        },
        host_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        rented_users: [],

        place_approved: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

const Place = model('Place', placeSchema)

module.exports = Place
