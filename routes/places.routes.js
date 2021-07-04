const router = require('express').Router()
const Place = require('./../models/Places.model')
const fileUploader = require('./../config/cloudinary.config')
const transporter = require('./../config/nodemailer.config')
const { checkRoles } = require('./../middleware')

/*GET places index views list */
router.get('/', (req, res) => {
    Place.find()
        .then(places => res.render('places/places-list', { places }))
        .catch(err => console.log(err))
})

/*GET places create  */

router.get('/new', checkRoles('GUEST'), (req, res) => res.render('places/new-place'))

/*POST places create  */

router.post('/new', checkRoles('GUEST'), (req, res) => {
    const host_id = req.session?.currentUser

    const { name_description, task_description, task_time, place_name, direction, number_rooms } = req.body

    const description = {
        name_description,
        task: {
            task_time,
            task_description,
        },
    }

    const query = { place_name, description, direction, number_rooms, image: req.file.path, host_id }

    Place.create(query)
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

/*GET places UPDATE  */

router.get('/edit/:id', (req, res) => res.send('hi'))
/*post places delete  */

router.post('/edit/:id', (req, res) => res.json(req.query))

/*GET places index views details */
router.get('/details/:place_id', (req, res) => {
    const { place_id } = req.params
    Place.findById(place_id)
        .then(place => res.render('places/places-details', place))
        .catch(err => console.log(err))
})

module.exports = router
