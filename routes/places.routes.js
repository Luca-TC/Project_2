const router = require('express').Router()
const Place = require('./../models/Places.model')

/*GET places index views list */
router.get('/', (req, res) => {
    res.render('places/places-list')
})

/*GET places create  */

router.get('/new', (req, res) => res.render('places/new-place'))

/*POST places create  */

router.post('/new', (req, res) => {
    const { nameDescription, taskDescription, time, placeName, image, host_id, direction, numberRooms } = req.body

    const description = {
        nameDescription,
        task: {
            time,
            taskDescription,
        },
    }

    const query = { placeName, image, host_id, direction, description, numberRooms }

    Place.create(query)
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

/*GET places UPDATE  */

router.get('/edit/:id', (req, res) => res.send('hi'))
/*post places delete  */

router.post('/edit/:id', (req, res) => res.json(req.query))

/*GET places index views details */
router.get('/details/:id', (req, res) => res.send('hi'))

module.exports = router
