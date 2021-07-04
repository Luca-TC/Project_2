const router = require('express').Router()
const User = require('./../models/User.model')
const bcrypt = require('bcrypt')
const { role, sessionActive } = require('./../utils')
const transporter = require('./../config/nodemailer.config')
const fileUploader = require('./../config/cloudinary.config')

router.get('/login', (req, res, next) => res.render('user/login'))

router.post('/login', (req, res) => {
    const { username, pwd } = req.body

    User.findOne({ username })
        .then(user => {
            if (!user) {
                console.log('entro al no user')
                res.render('user/login', { errorMessage: 'Usuario incorrecto' })
            }

            if (!bcrypt.compareSync(pwd, user.password)) {
                console.log('entro al no password')
                res.render('user/login', { errorMessage: 'Contraseña incorrecta' })
                return
            }
            req.session.currentUser = user // Iniciar sesión = almacenar el usuario logueado en req.session.currentUser
            console.log(req.session.currentUser)

            res.redirect('/places')
        })
        .catch(err => console.log(err))
})

// FORMULARIO REGISTER
router.get('/register', (req, res) => res.render('user/register'))

//

// LOGIC REGISTER
router.post('/register', fileUploader.single('userImage'), (req, res) => {
    // res.send(req.body, req.file.path)

    function randomString(length, chars) {
        var result = ''
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
        return result
    }

    //
    const token_confirmation = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')

    //
    const { name, username, description, pwd } = req.body
    transporter
        .sendMail({
            from: 'My project B&BIDAS',
            to: username,
            subject: 'BIENVENIDO A BEBIDAS PONTE TO CIEGO, no olvides confirmar tu email, pulsando el siguiente enlace ',
            text: 'oh yeah',
            html: `'<h1> BIENVENIDO A BEBIDAS PONTE TO CIEGO</h1><br>
            <a href="http://localhost:5000/confirmation/email/${token_confirmation}">Get confirmed</a>`,
        })
        .then(info => console.log(info))
        .catch(err => console.log(err))

    //
    const bcryptSalt = 10
    const salt = bcrypt.genSaltSync(bcryptSalt)
    let hashPass = bcrypt.hashSync(pwd, salt)

    //
    User.create({ name, username, password: hashPass, description, image: req.file.path, token_confirmation })
        .then(() => res.redirect('/login'))
        .catch(err => console.log(err))
})

// Confirmacion de email

router.get('/confirmation/email/:token', (req, res) => {
    const { token } = req.params

    User.find({ token_confirmation: token })
        .then(user => {
            if (user.length) {
                User.findByIdAndUpdate(user[0]._id, { email_validation: true, role: 'USER' }, { new: true })
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
    const currentUser = req.session?.currentUser
    const session = sessionActive(req)

    if (currentUser && session) {
        
        res.render('user/my-profile', {currentUser})
    } else {
        res.render('user/login', { errorMessage: 'no permiti' })
    }
})
/**GET LOGOUT */
router.get('/logout', (req, res) => req.session.destroy(() => res.redirect('/')))
module.exports = router
