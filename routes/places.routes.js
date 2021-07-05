const router = require('express').Router()
const Place = require('./../models/Places.model')
const Applicant = require('./../models/ApplicantsReview.model')
const fileUploader = require('./../config/cloudinary.config')
const transporter = require('./../config/nodemailer.config')
const { keepOut } = require('./../middleware')
const { role, sessionActive, emails } = require('./../utils')

/*GET places index views list */
router.get('/', (req, res) => {
    //
    Place.find({ place_approved: true })
        .then(places => res.render('places/places-list', { places }))
        .catch(err => console.log(err))
})

//

/*GET places create  */

router.get('/new', keepOut('PENDING'), (req, res) => res.render('places/new-place'))

//

/*POST places create  */

router.post('/new', fileUploader.single('image'), keepOut('PENDING'), (req, res) => {
    //

    console.log(req.file)

    const session = sessionActive(req)

    if (session) {
        //
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
        //
    } else {
        //
        res.render('user/login', { errorMessage: 'no permiti fai il login' })
    }
})

//

/*GET places UPDATE  */

// router.get('/edit/:id', (req, res) => res.send('hi')) //panel axios

//

/*post places delete  */

// router.post('/edit/:id', (req, res) => res.json(req.query)) //panel axios

//

/*GET places index views details */
router.get('/details/:place_id', (req, res) => {
    const session = sessionActive(req)

    if (session) {
        //
        const { place_id } = req.params
        const applicant_id = req.session.currentUser._id
        const session = sessionActive(req)
        const isPending = !role(req, 'PENDING')
        const isPro = role(req, 'ADMIN')

        Place.findById(place_id)
            .then(place => res.render('places/places-details', { place, isPending, isPro, session, applicant_id }))
            .catch(err => console.log(err))
        //
    } else {
        //
        res.render('user/login', { errorMessage: 'no permiti' })
    }
})

//

//

/*POST application */
router.post('/application', (req, res) => {
    const application = ({ place_id, host_id, user_applicant, start_date, final_date, direction, cover_letter } = req.body)
    Applicant.create(application)
        .then(() => res.redirect('/profile'))
        .catch(err => console.log(err))
})

//

/*POST email  */
router.post('/postEmail', (req, res) => {
    //
    const { id, answer } = req.body

    Place.findById(id)
        .populate('host_id')
        .then(elm => {
            //
            const objectEmail = { elm, answer }
            const email = emails('customMessage', objectEmail)

            transporter
                .sendMail(email)
                .then(info => console.log(info))
                .catch(err => console.log(err))
        })
})
module.exports = router
