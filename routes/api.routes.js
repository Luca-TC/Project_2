const router = require('express').Router()
const { Mongoose } = require('mongoose')
const Place = require('../models/Place.model')
const User = require('../models/User.model')
const Applicants = require('../models/ApplicantsReview.model')

/* GET home page */
router.get('/places', (req, res, next) => {
    //
    Place.find({ place_approved: false })
        .populate('host_id')
        .then(response => res.json(response))
        .catch(err => console.log(err))
})


router.get('/onePlace/:id', (req, res, next) => {
    //
    const { id } = req.params

    Place.findById(id)
        .populate('host_id')
        .then(response => res.json(response))
        .catch(err => console.log(err))
})


router.get('/myplaces', (req, res) => {

    const id = req.session.currentUser._id

    Place.find({ host_id: id })
        .then(place => res.json(place))
        .catch(err => console.log(err))
})


router.get('/myplace/edit/:id', (req, res) => {

    const { id } = req.params

    Place.findById(id)
        .then(place => res.json(place))
        .catch(err => console.log(err))
})

//Patron Models Views Controller

router.put('/updateHostPlace/:id', (req, res) => {

    const { id } = req.params

    Place.findByIdAndUpdate(id, { place_approved: true }, { new: true })
        .populate('host_id')
        .then(place => {

            if (place.host_id.role !== 'ADMIN') {

                User.findByIdAndUpdate(place.host_id._id, { role: 'HOST' })
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


router.delete('/deleteHostPlace/:id', (req, res) => {

    const { id } = req.params

    Place.findByIdAndDelete(id)
        .then(place => res.json(place))
        .catch(err => console.log(err))
})


router.get('/contracts', (req, res) => {

    Applicants.find({ contract_status: true })
        .populate('place_id')
        .populate('host_id')
        .populate('user_applicant_id')
        .then(response => res.json(response))
        .catch(err => console.log(err))
})


router.get('/placeslive', (req, res) => {

    Place.find({ place_approved: true })
        .then(response => res.json(response))
        .catch(err => console.log(err))
})


router.get('/unsplash', (req, res) => res.json(process.env.UNSPLASH_KEY))

module.exports = router
