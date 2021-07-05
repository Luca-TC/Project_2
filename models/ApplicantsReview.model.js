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
        user_applicant_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        start_date: Date,
        final_date: Date,

        contract_status: {
            type: Boolean,
            default: false,
        },

        readed: {
            type: Boolean,
            default: false,
        },

        cover_letter: String,
    },
    { timestamps: true }
)

const Applicants = model('Applicants', applicantsReview)

module.exports = Applicants
