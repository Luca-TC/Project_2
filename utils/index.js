module.exports = {
    sessionActive: req => (req.session?.currentUser ? true : false),

    role: (req, ...rolesToCheck) => rolesToCheck.includes(req.session.currentUser?.role),

    randomToken: () => {
        let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let randomToken = ''
        for (let i = 32; i > 0; --i) randomToken += str[Math.floor(Math.random() * str.length)]
        return randomToken
    },

    currentUser: (req) => {
        if (req.session?.currentUser) return req.session?.currentUser
        // return req.session ? req.session?.currentUser : null
    },


    emails: (type, objectNeeded, yesornot) => {
        if (type === 'email') {
            return {
                from: 'My project B&BIDAS',
                to: objectNeeded.username,
                subject: 'BIENVENIDO A BEBIDAS PONTE TO CIEGO, no olvides confirmar tu email, pulsando el siguiente enlace ',
                text: 'oh yeah',
                html: `'<h1> BIENVENIDO A BEBIDAS PONTE TO CIEGO</h1><br>
                <a href="http://localhost:3000/confirmation/email/${objectNeeded.token_confirmation}">Get confirmed</a>`,
            }
        }
        if (type === 'host') {
            return {
                from: 'My project B&BIDAS',
                to: objectNeeded.username,
                subject: 'BIENVENIDO A BEBIDAS PONTE TO CIEGO, no olvides confirmar tu email, pulsando el siguiente enlace ',
                text: 'oh yeah',
                html: `'<h1> BIENVENIDO A BEBIDAS PONTE TO CIEGO</h1><br>
                <a href="http://localhost:3000/confirmation/email/${objectNeeded.token_confirmation}">Get confirmed</a>`,
            }
        }
        if (type === 'customMessage') {
            console.log(objectNeeded.elm)
            return {
                from: 'My project B&BIDAS',
                to: objectNeeded.elm.host_id.username,
                subject: 'BIENVENIDO A BEBIDAS PONTE TO CIEGO, no olvides confirmar tu email, pulsando el siguiente enlace ',
                text: `'${objectNeeded.answer}'`,
                html: `'${objectNeeded.answer}'`,
            }
        }
    },
}
