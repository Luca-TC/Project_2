const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'username',
        pass: 'password',
    },
})

module.exports = transporter
