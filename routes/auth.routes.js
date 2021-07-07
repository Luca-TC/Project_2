const router = require('express').Router()
const User = require('./../models/User.model')
const bcrypt = require('bcrypt')
const { role, sessionActive, emails } = require('./../utils')
const transporter = require('./../config/nodemailer.config')
const fileUploader = require('./../config/cloudinary.config')
const { keepOut } = require('./../middleware')

router.get('/login', (req, res, next) => res.render('user/login'))

router.post('/login', (req, res) => {
    //
    const { username, pwd } = req.body

    User.findOne({ username })
        .then(user => {
            //
            if (!user) {
                //
                res.render('user/login', { errorMessage: 'Usuario incorrecto' })
                return
            }

            if (!bcrypt.compareSync(pwd, user.password)) {
                //
                res.render('user/login', { errorMessage: 'Contraseña incorrecta' })
                return
            }
            //
            req.session.currentUser = user // Iniciar sesión = almacenar el usuario logueado en req.session.currentUser

            res.redirect('/places')
        })
        .catch(err => console.log(err))
})

// FORMULARIO REGISTER
router.get('/register', (req, res) => res.render('user/register'))

//

// LOGIC REGISTER
router.post('/register', fileUploader.single('image'), (req, res) => {
    // res.send(req.body, req.file.path)

    function randomString(length, chars) {
        //
        let result = ''

        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
        return result
    }

    //
    const token_confirmation = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')

    //
    const { name, username, description, pwd, road, number, city, state } = req.body

    const address = { road, number, city, state }

    const objectEmail = { username, token_confirmation }

    const email = emails('email', objectEmail)

    transporter
        .sendMail(email)
        .then(info => console.log(info))
        .catch(err => console.log(err))

    //
    const bcryptSalt = 10
    const salt = bcrypt.genSaltSync(bcryptSalt)
    let hashPass = bcrypt.hashSync(pwd, salt)

    //
    User.create({ name, username, password: hashPass, description, image: req.file.path, token_confirmation, address })
        .then(() => res.redirect('/login'))
        .catch(err => console.log(err))
})

//

// Confirmacion de email

router.get('/confirmation/email/:token', (req, res) => {
    //
    const { token } = req.params

    User.find({ token_confirmation: token })
        .then(user => {
            //
            if (user.length) {
                //
                User.findByIdAndUpdate(user[0]._id, { role: 'USER' }, { new: true })
                    .then(user => res.render('index'))
                    .catch(err => console.log(err))
                //
            } else {
                res.render('errors/errorEmail')
            }
        })
        .catch(err => console.log(err))
})

//

//

/*GET current user profile */
router.get('/profile', (req, res) => {
    //
    // const id = req.session.currentUser._id

    const session = sessionActive(req)

    // console.log(currentUser)
    //tenemos que poner los roles aquì
    if (session) {
        //
        const currentUser = req.session?.currentUser
        const admin = req.session?.currentUser.role === 'ADMIN'
        const host = req.session?.currentUser.role === 'HOST'
        const pending = req.session?.currentUser.role === 'PENDING'
        res.render('user/my-profile', { currentUser, admin, host, pending })
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
            .then(user => res.render('user/others-profiles', { user }) )
            .catch(err => console.log(err))
        //
    } else {
        //
        res.render('user/login', { errorMessage: 'no permiti' })
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
