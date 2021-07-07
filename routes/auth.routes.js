const router = require('express').Router()
const User = require('./../models/User.model')
const Place = require('./../models/Place.model')
const bcrypt = require('bcrypt')
const { role, sessionActive, emails, randomToken, currentUser } = require('./../utils')
const transporter = require('./../config/nodemailer.config')
const fileUploader = require('./../config/cloudinary.config')
const { keepOut } = require('./../middleware')

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

            res.redirect('/places')
        })
        .catch(err => console.log(err))
})

// FORMULARIO REGISTER
router.get('/register', (req, res) => res.render('user/register'))


// LOGIC REGISTER
router.post('/register', fileUploader.single('image'), (req, res) => {

    // PENDING accept no foto

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
                    .then(user => res.render('index'))
                    .catch(err => console.log(err))

            } else {
                res.render('errors/errorEmail')
            }
        })
        .catch(err => console.log(err))
})


/*GET current user profile */
router.get('/profile', (req, res) => {

    // const session = 

    //tenemos que poner los roles aquì
    if (sessionActive(req)) {

        const admin = role(req, 'ADMIN')
        const host = role(req, 'HOST')
        const pending = role(req, 'PENDING')

        const loggedUser = currentUser(req)
        // console.log(currentUser)

        // const id = req.session?.currentUser._id
        // console.log(id)

        Place.find({ host_id: currentUser._id })
            .then(places => res.render('user/my-profile', { loggedUser, admin, host, pending, places }))
            .catch(err => console.log(err))
    } else {
        //
        res.render('user/login', { errorMessage: 'Log in first' })
    }
})

//GET OTHERS PROFILES

router.get('/user/details/:user_id', (req, res) => {
    const session = sessionActive(req)

    if (session) {
        //
        const { user_id } = req.params

        User.findById(user_id)
            .then(user => res.render('user/others-profiles', { user }))
            .catch(err => console.log(err))
        //
    } else {
        //
        res.render('user/login', { errorMessage: 'not permited' })
    }
})
/**GET LOGOUT */
router.get('/logout', (req, res) => req.session.destroy(() => res.redirect('/')))

//

router.get('/admin_panel', keepOut('USER', 'HOST', 'PENDING'), (req, res) => {
    res.render('admin/admin_panel')
})
router.get('/host_panel', keepOut('USER', 'ADMIN', 'PENDING'), (req, res) => {
    res.render('host/host_panel')
})
//

//
module.exports = router
