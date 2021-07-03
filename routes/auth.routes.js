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
router.get('/login', (req, res, next) => res.render('index'))

router.post('/login', (req, res) => {
    // Movie.create({ title, description, image: req.file.path })
})

// FORMULARIO REGISTER
router.get('/register', (req, res) => res.render('user/register'))

// LOGIC REGISTER
router.post('/register', fileUploader.single('userImage'), (req, res) => {
    // res.send(req.body, req.file.path)

    const { name, userName, password: hashPass, description, pwd } = req.body

    const bcryptSalt = 10
    const salt = bcrypt.genSaltSync(bcryptSalt)
    let hashPass = bcrypt.hashSync(pwd, salt)

    User.create({ name, userName, password: hashPass, description, image: req.file.path })
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

module.exports = router
