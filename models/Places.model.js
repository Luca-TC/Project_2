const { Schema, model } = require("mongoose");


const placeSchema = new Schema({
    placeName: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        required: true,
        type: String
    },
    host_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        nameDescription: String,
        task: {
            time: Number,
            taskDescription: String,
        },
        //  required: true,
    },
    direction: {
        type: String,
        required: true
    },
    user_applicant: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    numberRooms:{
        type: Number,
        required :true
    },
    rent: [],
    placeApproved:{
        type: Boolean,
        default: false
    },
    placeApproved:{
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const Place = model("Place", placeSchema);

module.exports = Place;
