require('dotenv/config')
require('../db/index')

const Mongoose = require('mongoose')
const User = require('../models/User.model')
const Places = require('../models/Places.model')

const users = [
    {
        name: 'Salva',
        username: 'lahuhsuhds@gmail.com',
        password: '12354',
    },
    {
        name: 'Luca',
        username: 'salta@gmail.com',
        password: 'vdsfgwe3',
    },
    {
        name: 'Carlotta',
        username: 'tetta@gmail.com',
        password: 'fgdgfd3',
    },
    {
        name: 'Mara',
        username: 'chiappa@gmail.com',
        password: '6666',
    },
]

User.create(users)
    .then(users => {
        console.log(users)
        Places.create({
            place_name: 'Teulada',
            image: 'hshsh.jpg',
            host_id: users[0]._id,
            task_info: {
                name: 'name description',
                time: 3,
                description: 'task is this one',
            },
            direction: 'via campiania ',
            user_applicant: [users[1]._id, users[2]._id, users[3]._id],
            number_rooms: 3,
        })
        return users
    })
    .then(users => {
        console.log(users)
        Places.create({
            place_name: 'Teulada2',
            image: 'hshsh.jpg',
            host_id: users[0]._id,
            task_info: {
                name: 'name description',
                time: 3,
                description: 'task is this one',
            },
            direction: 'via campiania ',
            user_applicant: [users[1]._id, users[2]._id, users[3]._id],
            number_rooms: 3,
        })
        return users
    })
    .then(users => {
        console.log(users)
        Places.create({
            place_name: 'Teulada3',
            image: 'hshsh.jpg',
            host_id: users[0]._id,
            task_info: {
                name: 'name description',
                time: 3,
                description: 'task is this one',
            },
            direction: 'via campiania ',
            user_applicant: [users[1]._id, users[2]._id, users[3]._id],
            number_rooms: 3,
        })
        return users
    })
    .then(users => {
        console.log(users)
        Places.create({
            place_name: 'Teulada4',
            image: 'hshsh.jpg',
            host_id: users[0]._id,
            task_info: {
                name: 'name description',
                time: 3,
                description: 'task is this one',
            },
            direction: 'via campiania ',
            user_applicant: [users[1]._id, users[2]._id, users[3]._id],
            number_rooms: 3,
        })
        return users
    })
    .then(users => {
        console.log(users)
        Places.create({
            place_name: 'Pula',
            image: 'hshs.jpg',
            host_id: users[0]._id,
            task_info: {
                name: 'name description',
                time: 3,
                description: 'task is this one',
            },
            direction: 'via roma ',
            user_applicant: [users[1]._id, users[2]._id, users[3]._id],
            number_rooms: 3,
        }).then(() => Mongoose.connection.close())
    })

    .catch(err => console.log('new error', err))
