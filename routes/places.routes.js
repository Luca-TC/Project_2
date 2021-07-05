const router = require('express').Router()
const Place = require('./../models/Places.model')
const Applicant = require('./../models/ApplicantsReview.model')
const fileUploader = require('./../config/cloudinary.config')
const transporter = require('./../config/nodemailer.config')
const { keepOut } = require('./../middleware')
const { role, sessionActive } = require('./../utils')

/*GET places index views list */
router.get('/', (req, res) => {
    Place.find()
        .then(places => res.render('places/places-list', { places }))
        .catch(err => console.log(err))
})

/*GET places create  */

router.get('/new', keepOut('PENDING'), (req, res) => res.render('places/new-place'))

/*POST places create  */

router.post('/new', keepOut('PENDING'), (req, res) => {
    const session = sessionActive(req)

    if (session) {
        const host_id = req.session?.currentUser

        const { name, description, time, place_name, direction, number_rooms } = req.body

        const task_info = {
            name,
            task: {
                time,
                description,
            },
        }

        const query = { place_name, task_info, direction, number_rooms, image: req.file.path, host_id }

        Place.create(query)
            .then(response => res.json(response))
            .catch(err => console.log(err))
    } else {
        res.render('user/login', { errorMessage: 'no permiti fai il login' })
    }
})

/*GET places UPDATE  */

router.get('/edit/:id', (req, res) => res.send('hi')) //panel axios
/*post places delete  */

router.post('/edit/:id', (req, res) => res.json(req.query)) //panel axios

/*GET places index views details */
router.get('/details/:place_id', (req, res) => {
    const session = sessionActive(req)

    if (session) {
        const { place_id } = req.params
        const applicant_id = req.session.currentUser._id
        const session = sessionActive(req)
        const isPending = !role(req, 'PENDING')
        const isPro = role(req, 'ADMIN')

        Place.findById(place_id)
            .then(place => res.render('places/places-details', { place, isPending, isPro, session, applicant_id }))
            .catch(err => console.log(err))
    } else {
        res.render('user/login', { errorMessage: 'no permiti' })
    }
})
/*POST application */
router.post('/application', (req, res) => {
    const application = ({ place_id, host_id, user_applicant, start_date, final_date, direction, cover_letter } = req.body)
    Applicant.create(application)
        .then(() => res.redirect('user/my-profile'))
        .catch(err => console.log(err))
})
module.exports = router
