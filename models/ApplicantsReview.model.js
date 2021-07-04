const { Schema, model } = require('mongoose')

const applicantsReview = new Schema(
    {
        place_id: {
            type: Schema.Types.ObjectId,
            ref: 'Place',
        },
        host_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        start_date: String,
        final_date: String,

        direction: {
            type: String,
            //required: true,
        },
        user_applicant: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        confirmed_contract: {
            type: Boolean,
            default : false
        },
        cover_letter: String,

        pending_approved: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

const Applicants = model('Applicants', applicantsReview)

module.exports = Applicants
