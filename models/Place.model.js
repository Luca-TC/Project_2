const { Schema, model } = require('mongoose')

const placeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            // unique: true,
        },

        task_info: {
            name: String,
            working_hours: Number,
            description: String,
            //  required: true,
        },

        address: {
            road: String,
            number: Number,
            city: String,
            state: String,
        },

        rooms: {
            type: Number,
            required: true,
        },

        image: {
            // required: true,
            type: String,
            default: 'https://media-cdn.tripadvisor.com/media/photo-s/12/4c/0a/ba/montecristo-country-house.jpg',
        },

        host_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        place_approved: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

const Place = model('Place', placeSchema)

module.exports = Place
