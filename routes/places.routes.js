const router = require('express').Router()
const Place = require('./../models/Place.model')
const Applicant = require('./../models/ApplicantsReview.model')
const fileUploader = require('./../config/cloudinary.config')
const transporter = require('./../config/nodemailer.config')
const { rejectUser } = require('./../middleware')
const { role, sessionActive, emails, currentUser } = require('./../utils')

/*GET places index views list */
router.get('/', (req, res) => {
    //
    Place.find({ place_approved: true })
        .then(places => res.render('places/places-list', { places }))
        .catch(err => console.log(err))
})


/*GET places create  */

router.get('/new', rejectUser('PENDING'), (req, res) => res.render('places/new-place'))


/*POST places create  */

router.post('/new', fileUploader.single('image'), rejectUser('PENDING'), (req, res) => {


    if (sessionActive(req)) {

        const host_id = req.session?.currentUser

        const { name, description, working_hours, task_name, direction, rooms, road, number, city, state } = req.body

        const task_info = {
            name: task_name,
            working_hours,
            description,
        }

        const address = {
            road,
            number,
            city,
            state,
        }

        const query = { name, task_info, direction, rooms, image: req.file.path, host_id, address }

        Place.create(query)
            .then(() => res.redirect('/profile'))
            .catch(err => console.log(err))

    } else {

        res.render('user/login', { errorMessage: 'no permiti fai il login' })
    }
})

/*GET places UPDATE  */

router.put('/updateMyPlace', rejectUser('USER', 'PENDING'), (req, res) => {
    const { id, placeName, rooms } = req.body

    const task_info = ({ name, description, working_hours } = req.body)

    const address = ({ road, number, city, state } = req.body)

    Place.findByIdAndUpdate(id, { name: placeName, task_info, rooms, address }, { new: true })
        .then(place => res.json(place))
        .catch(err => console.log(err))
})



/*GET places index views details */
router.get('/details/:place_id', (req, res) => {

    if (sessionActive(req)) {

        const { place_id } = req.params
        const applicant_id = currentUser(req)._id
        const session = sessionActive(req)
        const isPending = !role(req, 'PENDING')

        Place.findById(place_id)
            .then(place => res.render('places/places-details', { place, isPending, session, applicant_id }))
            .catch(err => console.log(err))

    } else {

        res.render('user/login', { errorMessage: 'no permiti' })
    }
})


/*POST application */
router.post('/application', rejectUser('PENDING'), (req, res) => {

    const application = { place_id, host_id, user_applicant, start_date, final_date, direction, cover_letter } = req.body

    Applicant.create(application)
        .then(() => res.redirect('/profile'))
        .catch(err => console.log(err))
})

//

/*POST email  */
router.post('/postEmail', rejectUser('USER', 'PENDING'), (req, res) => {

    const { id, answer } = req.body

    Place.findById(id)
        .populate('host_id')
        .then(elm => {

            const objectEmail = { elm, answer }
            const email = emails('customMessage', objectEmail)

            transporter
                .sendMail(email)
                .then(info => console.log(info))
                .catch(err => console.log(err))
        })
})

router.put('/returnPending/:id', rejectUser('USER', 'PENDING', 'HOST'), (req, res) => {
    const { id } = req.params

    console.log(id)

    Place.findByIdAndUpdate(id, { place_approved: false }, { new: true })
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

module.exports = router
