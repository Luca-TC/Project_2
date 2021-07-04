const { Schema, model } = require('mongoose')

const applicantsReview = new Schema(
    {
        place_name: {
            type: String,
            required: true,
        },
        host_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        start_date: String,
        final_date: String,

        direction: {
            type: String,
            required: true,
        },
        user_applicant: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],

        cover_letter: String,

        pendingApproved: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

const Applicants = model('Applicants', applicantsReview)

module.exports = Applicants
