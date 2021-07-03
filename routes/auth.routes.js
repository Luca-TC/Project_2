const router = require('express').Router()
const User = require('./../models/User.model')
const bcrypt = require('bcrypt')
//
const transporter = require('./../config/nodemailer.config')
const fileUploader = require('./../config/cloudinary.config')

// transporter.sendMail({
//   from:'My project B&BIDAS <myawesome@b&bdas.com>',
//   to: ' ',
//   subject: '',
//   text : '',
//   html: 'if accept html will send this'
// }).then(info=> console.log(info)).catch(err => console.log(err))

/* GET log-in*/
/* POST SIGN-in*/
/* GET log-in*/
router.get('/login', (req, res, next) => res.render('user/login'))

router.post('/login', (req, res) => {
    const { username, pwd } = req.body

    User.findOne({ username })
        .then(user => {
            if (!user) {
                res.render('user/login', { errorMessage: 'Usuario incorrecto' })
            }

            if (bcrypt.compareSync(pwd, user.password) === false) {
                res.render('user/login', { errorMessage: 'Contraseña incorrecta' })
                return
            }
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
        .then(() => res.redirect('/places'))
        .catch(err => console.log(err))
})

// Confirmacion de email

router.get('/confirmation/email/:token', (req, res) => {
    const { token } = req.params

    User.find({ token_confirmation: token })
        .then(user => {
            User.findByIdAndUpdate(user[0]._id, { email_validation: true, role: 'USER' }, { new: true })
                .then(user => res.send(user))
                .catch(err => console.log(err)) //.findByIdAndUpdate(place_id, { name , type })
        })
        .catch(err => console.log(err))
})

module.exports = router
