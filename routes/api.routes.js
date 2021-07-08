const router = require('express').Router()
const { Mongoose } = require('mongoose')
const Place = require('../models/Place.model')
const User = require('../models/User.model')
const Applicants = require('../models/ApplicantsReview.model')
const { rejectUser } = require('../middleware')
const { emails } = require('../utils')
const transporter = require('./../config/nodemailer.config')

/* GET home page */
router.get('/places', rejectUser('HOST', 'USER', 'PENDING'), (req, res, next) => {
    //
    Place.find({ place_approved: false })
        .populate('host_id')
        .then(response => res.json(response))
        .catch(err => console.log(err))
})


router.get('/onePlace/:id', rejectUser('HOST', 'USER', 'PENDING'), (req, res, next) => {
    //
    const { id } = req.params

    Place.findById(id)
        .populate('host_id')
        .then(response => res.json(response))
        .catch(err => console.log(err))
})


router.get('/myplaces', rejectUser('ADMIN', 'USER', 'PENDING'), (req, res) => {

    const id = req.session.currentUser._id

    Place.find({ host_id: id })
        .then(place => res.json(place))
        .catch(err => console.log(err))
})


router.get('/myplace/edit/:id', rejectUser('ADMIN', 'USER', 'PENDING'), (req, res) => {

    const { id } = req.params

    Place.findById(id)
        .then(place => res.json(place))
        .catch(err => console.log(err))
})

//Patron Models Views Controller

router.put('/updateHostPlace/:id', rejectUser('HOST', 'USER', 'PENDING'), (req, res) => {

    const { id } = req.params

    Place.findByIdAndUpdate(id, { place_approved: true }, { new: true })
        .populate('host_id')
        .then(place => {

            if (place.host_id.role !== 'ADMIN') {

                User.findByIdAndUpdate(place.host_id._id, { role: 'HOST' }, { new: true })
                    .then(response => console.log(response))
                    .catch(err => console.log(err))
                return place
            }
        })
        .then((place) => {
            Place.findById(place._id)
                .populate('host_id')
                .then(place => res.json(place))
        })
        .catch(err => console.log(err))
})
// insert message pending
// insert message pending
// insert message pending


router.delete('/deleteHostPlace/:id', rejectUser('USER', 'PENDING'), (req, res) => {

    const { id } = req.params

    Place.findByIdAndDelete(id)
        .populate('host_id')
        .then(place => {



            const objectEmail = place.host_id.username

            const email = emails('host', objectEmail, false)

            transporter
                .sendMail(email)
                .then(info => console.log(info))
                .catch(err => console.log(err))






            res.json(place)
        })
        .catch(err => console.log(err))
})


router.get('/contracts', rejectUser('HOST', 'USER', 'PENDING'), (req, res) => {

    Applicants.find({ contract_status: true })
        .populate('place_id')
        .populate('host_id')
        .populate('user_applicant_id')
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

router.get('/applicants', rejectUser('ADMIN', 'USER', 'PENDING'), (req, res) => {

    Applicants.find({ contract_status: false })
        .populate('place_id')
        .populate('host_id')
        .populate('user_applicant_id')
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

/**put pending contracts */
router.put('/updateApplicant/:id', rejectUser('ADMIN', 'USER', 'PENDING'), (req, res) => {

    const { id } = req.params

    Applicants.findByIdAndUpdate(id, { contract_status: true }, { new: true })
        .populate('host_id')
        .then(appl => res.json(appl))
        .catch(err => console.log(err))
})

/**delete pending contracts*/
router.delete('/deleteApplicant/:id', rejectUser('ADMIN', 'USER', 'PENDING'), (req, res) => {

    const { id } = req.params

    Applicants.findByIdAndDelete(id)
        .populate('user_applicant_id')
        .then(appl => {
            // console.log(appl)

            // const objectEmail = appl.user_applicant_id

            // console.log(objectEmail)
            // const email = emails('host', objectEmail)

            // transporter
            //     .sendMail(email)
            //     .then(info => console.log(info))
            //     .catch(err => console.log(err))

            res.json(appl)

        })

        .catch(err => console.log(err))
})

/**get places live */
router.get('/placeslive', rejectUser('HOST', 'USER', 'PENDING'), (req, res) => {

    Place.find({ place_approved: true })
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

/**I'm in love with Salva's magic tricks---Luca*/
router.get('/unsplash', (req, res) => res.json(process.env.SCREENS))

module.exports = router
