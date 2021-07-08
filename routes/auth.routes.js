const router = require('express').Router()
const User = require('./../models/User.model')
const Place = require('./../models/Place.model')
const Applicant = require('./../models/ApplicantsReview.model')
const bcrypt = require('bcrypt')
const { role, sessionActive, emails, randomToken, currentUser } = require('./../utils')
const transporter = require('./../config/nodemailer.config')
const fileUploader = require('./../config/cloudinary.config')
const { rejectUser } = require('./../middleware')

router.get('/login', (req, res, next) => res.render('user/login'))

router.post('/login', (req, res) => {

    const { username, pwd } = req.body

    User.findOne({ username })
        .then(user => {

            if (!user) {

                res.render('user/login', { errorMessage: 'Usuario incorrecto' })
                return
            }

            if (!bcrypt.compareSync(pwd, user.password)) {

                res.render('user/login', { errorMessage: 'Contraseña incorrecta' })
                return
            }

            req.session.currentUser = user // Iniciar sesión = almacenar el usuario logueado en req.session.currentUser

            res.redirect('/')
        })
        .catch(err => console.log(err))
})

// FORMULARIO REGISTER
router.get('/register', (req, res) => res.render('user/register'))


// LOGIC REGISTER
router.post('/register', fileUploader.single('image'), (req, res) => {


    const token_confirmation = randomToken();

    const { name, username, description, pwd } = req.body

    const address = { road, number, city, state } = req.body

    const objectEmail = { username, token_confirmation }

    const email = emails('email', objectEmail)

    transporter
        .sendMail(email)
        .then(info => console.log(info))
        .catch(err => console.log(err))

    const bcryptSalt = 10
    const salt = bcrypt.genSaltSync(bcryptSalt)
    let hashPass = bcrypt.hashSync(pwd, salt)

    User.create({ name, username, password: hashPass, description, image: req.file.path, token_confirmation, address })
        .then(() => res.redirect('/login'))
        .catch(err => console.log(err))
})

//

// Confirmacion de email

router.get('/confirmation/email/:token', (req, res) => {

    const { token } = req.params

    User.find({ token_confirmation: token })
        .then(user => {

            if (user.length) {

                User.findByIdAndUpdate(user[0]._id, { role: 'USER' }, { new: true })
                    .then(() => res.redirect('/'))
                    .catch(err => console.log(err))

            } else {

                res.render('errors/errorEmail')
            }
        })
        .catch(err => console.log(err))
})


/*GET current user profile */
router.get('/profile', (req, res) => {

    if (sessionActive(req)) {


        const admin = role(req, 'ADMIN')
        const host = role(req, 'HOST')
        const userOrAdmin = role(req, 'USER', 'ADMIN')
        const pending = role(req, 'PENDING')
        const loggedUser = currentUser(req)

        const promisePlace = Place.find({ host_id: loggedUser._id })
        const promiseApplicants = (Applicant.find({ user_applicant_id: loggedUser._id }).populate('place_id')
            .populate('host_id')
            .populate('user_applicant_id'))

        Promise.all([promisePlace, promiseApplicants])
            .then(myPlacesAndMyApps => {

                const [place, applicant] = myPlacesAndMyApps

                res.send({ applicant, admin, host, pending, loggedUser, userOrAdmin })
                // res.render('user/my-profile', { place, applicant, admin, host, pending, loggedUser, userOrAdmin })
            })
            .catch(err => console.log(err))


    } else {

        res.render('user/login', { errorMessage: 'Log in first !' })
    }
})

//GET OTHERS PROFILES

router.get('/user/details/:user_id', rejectUser('PENDING'), (req, res) => {

    if (sessionActive(req)) {

        const { user_id } = req.params

        User.findById(user_id)
            .then(user => {
                res.render('user/others-profiles', { user })
                return user
            })
            .then(user => console.log(user))
            .catch(err => console.log(err))

    } else {

        res.render('user/login', { errorMessage: 'Not permitted 🚫' })
    }
})


/**GET LOGOUT */
router.get('/logout', (req, res) => req.session.destroy(() => res.redirect('/')))

router.get('/admin_panel', rejectUser('USER', 'HOST', 'PENDING'), (req, res) => {
    res.render('admin/admin_panel')
})
router.get('/host_panel', rejectUser('USER', 'ADMIN', 'PENDING'), (req, res) => {
    res.render('host/host_panel')
})

module.exports = router
