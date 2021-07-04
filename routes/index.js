module.exports = app => {
    app.use('/', require('./base.routes.js'))
    app.use('/', require('./auth.routes.js'))
    app.use('/places', require('./places.routes.js'))
    app.use('/api', require('./api.routes.js'))
    // app.use('/xxx', require('./.routes.js'))
}
