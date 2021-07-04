const router = require('express').Router()
const Place = require('../models/Places.model')

/* GET home page */
router.post('/places', (req, res, next) => {
    Place.find({ place_approved: false })
        .populate('host_id')
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

router.post('/onePlace/:id', (req, res, next) => {
    const { id } = req.params

    Place.findById(id)
        .populate('host_id')
        .then(response => res.json(response))
        .catch(err => console.log(err))
})
module.exports = router
