require('dotenv/config')
require('../db/index')

const Mongoose = require('mongoose')
const User = require('../models/User.model')
const Places = require('../models/Places.model')
User.collection.drop()
Places.collection.drop()

const users = [
    {
        name: 'admin',
        role:'ADMIN',
        username: 'admin@admin.com',
        password: '$2b$10$xgMcrXkNZtsCCH2NSU4o2OI3vVLmj.RcPhk8gYT0B3tSBgLkYIRWm',
    },
    {
        name: 'host',
        role:'HOST',
        username: 'host@host.com',
        password: '$2b$10$xgMcrXkNZtsCCH2NSU4o2OI3vVLmj.RcPhk8gYT0B3tSBgLkYIRWm',
    },
    {
        name: 'user',
        role:'USER',
        username: 'user@user.com',
        password: '$2b$10$xgMcrXkNZtsCCH2NSU4o2OI3vVLmj.RcPhk8gYT0B3tSBgLkYIRWm',
    },
    {
        name: 'pending',
        role:'PENDING',
        username: 'pending@pending.com',
        password: '$2b$10$xgMcrXkNZtsCCH2NSU4o2OI3vVLmj.RcPhk8gYT0B3tSBgLkYIRWm',
    },
]

User.create(users)
    .then(users => {
        console.log(users)
        Places.create({
            name: 'Teulada',
            image: undefined,
            host_id: users[1]._id,
            task_info: {
                name: 'name description',
                working_hours: 3,
                description: 'task is this one',
            },
            address: {
                road: 'gran via',
                number: 3,
                city: 'Madrid',
                state: 'Washington',
            },
            rooms: 3,
        })
        return users
    })
    .then(users => {
        Places.create({
            name: 'Teulada2',
            image: undefined,
            host_id: users[1]._id,
            task_info: {
                name: 'name description',
                working_hours: 3,
                description: 'task is this one',
            },
            address: {
                road: 'gran via',
                number: 3,
                city: 'Madrid',
                state: 'Washington',
            },
            rooms: 3,
        })
        return users
    })
    .then(users => {
        Places.create({
            name: 'Teulada3',
            image: undefined,
            host_id: users[1]._id,
            task_info: {
                name: 'name description',
                working_hours: 3,
                description: 'task is this one',
            },
            address: {
                road: 'gran via',
                number: 3,
                city: 'Madrid',
                state: 'Washington',
            },
            rooms: 3,
        })
        return users
    })
    .then(users => {
        Places.create({
            name: 'Teulada4',
            image: undefined,
            host_id: users[1]._id,
            task_info: {
                name: 'name description',
                working_hours: 3,
                description: 'task is this one',
            },
            address: {
                road: 'gran via',
                number: 3,
                city: 'Madrid',
                state: 'Washington',
            },
            rooms: 3,
        })
        return users
    })
    .then(users => {
        Places.create({
            name: 'Pula',
            image: undefined,
            host_id: users[1]._id,
            task_info: {
                name: 'name description',
                working_hours: 3,
                description: 'task is this one',
            },
            address: {
                road: 'gran via',
                number: 3,
                city: 'Madrid',
                state: 'Washington',
            },
            rooms: 3,
        }).then(() => Mongoose.connection.close())
    })

    .catch(err => console.log('new error', err))
