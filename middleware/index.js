module.exports = {
    // checkLoggedUser: (req, res, next) => {
    //     req.session.currentUser ? next() : res.render('pages/auth/login-page', { errorMessage: 'Inicia sesión para continuar' })
    // },
    rejectUser:
        (...rolesToCheck) =>
            (req, res, next) => {

                if (req.session) {

                    req.session?.currentUser && !rolesToCheck.includes(req.session?.currentUser?.role)
                        ? next()
                        : res.render('user/login', { errorMessage: 'No dispones de privilegios suficientes' })

                } else {

                    res.render('user/login', { errorMessage: 'No dispones de privilegios suficientes' })
                }
            },

}
