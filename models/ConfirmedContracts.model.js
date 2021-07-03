const { Schema, model } = require("mongoose");


const confirmedSchema = new Schema({
    placeName: {
        type: String,
        required: true
    },
    host_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dates: {
        type: String
    },
    direction: {
        type: String,
        required: true
    },
    user_applicant: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    pendingApproved: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const Confirmed = model("Confirmed", confirmedSchema);

module.exports = Confirmed;
