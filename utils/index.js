module.exports = {
    sessionActive: req => (req.session?.currentUser ? true : false),

    role: (req, ...rolesToCheck) => rolesToCheck.includes(req.session.currentUser?.role),

    emails: (validation, objectNeeded, yesornot) => {
        if (validation === 'email') {
            return {
                from: 'My project B&BIDAS',
                to: objectNeeded.username,
                subject: 'BIENVENIDO A BEBIDAS PONTE TO CIEGO, no olvides confirmar tu email, pulsando el siguiente enlace ',
                text: 'oh yeah',
                html: `'<h1> BIENVENIDO A BEBIDAS PONTE TO CIEGO</h1><br>
                <a href="http://localhost:3000/confirmation/email/${objectNeeded.token_confirmation}">Get confirmed</a>`,
            }
        }
        if (validation === 'host') {
            return {
                from: 'My project B&BIDAS',
                to: objectNeeded.username,
                subject: 'BIENVENIDO A BEBIDAS PONTE TO CIEGO, no olvides confirmar tu email, pulsando el siguiente enlace ',
                text: 'oh yeah',
                html: `'<h1> BIENVENIDO A BEBIDAS PONTE TO CIEGO</h1><br>
                <a href="http://localhost:3000/confirmation/email/${objectNeeded.token_confirmation}">Get confirmed</a>`,
            }
        }
        if (validation === 'customMessage') {
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
