require('dotenv/config')
require('../db/index')

const Mongoose = require('mongoose')
const User = require('../models/User.model')
const Places = require('../models/Place.model')
const Applicant = require('../models/ApplicantsReview.model')
User.collection.drop()
Places.collection.drop()
Applicant.collection.drop()
const users = [
    {
        name: 'admin',
        role: 'ADMIN',
        username: 'admin@admin.com',
        password: '$2b$10$xgMcrXkNZtsCCH2NSU4o2OI3vVLmj.RcPhk8gYT0B3tSBgLkYIRWm',
    },
    {
        name: 'host',
        role: 'HOST',
        username: 'host@host.com',
        password: '$2b$10$xgMcrXkNZtsCCH2NSU4o2OI3vVLmj.RcPhk8gYT0B3tSBgLkYIRWm',
    },
    {
        name: 'user',
        role: 'USER',
        username: 'user@user.com',
        password: '$2b$10$xgMcrXkNZtsCCH2NSU4o2OI3vVLmj.RcPhk8gYT0B3tSBgLkYIRWm',
    },
    {
        name: 'pending',
        role: 'PENDING',
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
        }).then(place => {
            Applicant.create({
                place_id: place._id,
                host_id: place.host_id,
                user_applicant_id: users[2]._id,
                // start_data:
                // final_data:
            })
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
        })
            .then(place => {
                Applicant.create({
                    place_id: place._id,
                    host_id: place.host_id,
                    user_applicant_id: users[2]._id,
                    contract_status: true,
                    // start_data:
                    // final_data:
                }).then(() => Mongoose.connection.close())
            })

            .catch(err => console.log(err))
    })

    .catch(err => console.log('new error', err))
