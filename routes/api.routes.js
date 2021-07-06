const router = require('express').Router()
const { Mongoose } = require('mongoose')
const Place = require('../models/Place.model')
const User = require('../models/User.model')

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
    //
})
//
router.get('/myplaces', (req, res) => {
    const id = req.session.currentUser._id
    // console.log('funziono', req.session.currentUser._id, id)
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

//

router.post('/updateHostPlace/:id', (req, res) => {
    //
    const { id } = req.params

    console.log('------------', req.body)

    Place.findByIdAndUpdate(id, { place_approved: true }, { new: true })
        .then(place => {
            //Hay que buscar una manera de que no updatee al admin
            User.findByIdAndUpdate(place.host_id, { role: 'HOST' }, { new: true })
                .then(user => place)
                .then(place => {
                    //
                    Place.findById(place._id)
                        .populate('host_id')
                        .then(place => res.json(place))
                        // .then(() => {
                        //     const objectEmail = { username, token_confirmation }

                        //     const email = emails('host', objectEmail)

                        //     transporter
                        //         .sendMail(email)
                        //         .then(info => console.log(info))
                        //         .catch(err => console.log(err))
                        // })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

router.post('/updateMyPlace/:id', (req, res) => {
    //
    //const { id } = req.params

    console.log('------------', req.body)

    // Place.findByIdAndUpdate(id, {})
    //     .then(place => {
    //         //
    //         // User.findByIdAndUpdate(place.host_id, { role: 'HOST' }, { new: true })
    //         //     .then(user => place)
    //         //     .then(place => {
    //         //         //
    //         //         Place.findById(place._id)
    //         //             .populate('host_id')
    //         //             .then(place => res.json(place))
    //         //             // .then(() => {
    //         //             //     const objectEmail = { username, token_confirmation }
    //         //             //     const email = emails('host', objectEmail)
    //         //             //     transporter
    //         //             //         .sendMail(email)
    //         //             //         .then(info => console.log(info))
    //         //             //         .catch(err => console.log(err))
    //         //             // })
    //         //             .catch(err => console.log(err))
    //         //     })
    //         //     .catch(err => console.log(err))
    //     })
    //     .catch(err => console.log(err))
})

router.post('/deleteHostPlace/:id', (req, res) => {
    //
    console.log('funziono delete', id)
    const { id } = req.params
    //
    Place.findByIdAndDelete(id)
        .then(place => res.json(place))
        .catch(err => console.log(err))
})

module.exports = router
