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
        image: 'https://germanalvarez.net/img/german-alvarez-sc.jpg',
        address: {
            road: 'La casa de popino',
            number: 69,
            city: 'Madrid',
            state: 'Espain'
        },
        description: 'Pecho palomo',
        password: '$2b$10$xgMcrXkNZtsCCH2NSU4o2OI3vVLmj.RcPhk8gYT0B3tSBgLkYIRWm',
    },
    {
        name: 'host',
        role: 'HOST',
        username: 'host@host.com',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxvVwpemVF94HT9dw9Y4PZG8lY1kFs0ce4BQ&usqp=CAU',
        address: {
            road: 'trump tower',
            number: 9,
            city: 'New york',
            state: 'USA'
        },
        description: 'VOY A MATAR EL MUNDO',
        password: '$2b$10$xgMcrXkNZtsCCH2NSU4o2OI3vVLmj.RcPhk8gYT0B3tSBgLkYIRWm',
    },
    {
        name: 'user',
        role: 'USER',
        username: 'user@user.com',
        image: 'https://preview.redd.it/h5gnz1ji36o61.png?width=225&format=png&auto=webp&s=84379f8d3bbe593a2e863c438cd03e84c8a474fa',
        address: {
            road: 'trump tower',
            number: 9,
            city: 'New york',
            state: 'USA'
        },
        description: 'VOY A MATAR EL MUNDO',
        password: '$2b$10$xgMcrXkNZtsCCH2NSU4o2OI3vVLmj.RcPhk8gYT0B3tSBgLkYIRWm',
    },


]

User.create(users)
    .then(users => {
        console.log(users)
        Places.create({
            name: 'Chalet',
            image: 'https://res.cloudinary.com/dnpvaaivi/image/upload/v1625780628/project/kypmczsbim0lv8ojp5h2.png',
            host_id: users[1]._id,
            task_info: {
                name: 'trabajar en el campo',
                working_hours: 3,
                description: 'cultivo cuidado animales',
            },
            address: {
                road: 'Serra de aitana',
                number: 10,
                city: 'Valencia paiporta',
                state: '',
            },
            rooms: 3,
        })
        return users
    })
    .then(users => {
        Places.create({
            name: 'Piso paiporta',
            image: 'https://res.cloudinary.com/dnpvaaivi/image/upload/v1625780628/project/kypmczsbim0lv8ojp5h2.png',
            host_id: users[1]._id,
            task_info: {
                name: 'limpiar la calle',
                working_hours: 2,
                description: 'lo que sea',
            },
            address: {
                road: 'San juan de rivera',
                number: 6,
                city: 'Valencia paiporta',
                state: '',
            },
            rooms: 3,
        })
        return users
    })
    .then(users => {
        Places.create({
            name: 'piso Almussafes',
            image: 'https://res.cloudinary.com/dnpvaaivi/image/upload/v1625780615/project/unfylbu3obsoicjzregu.png',
            host_id: users[1]._id,
            task_info: {
                name: 'name description',
                working_hours: 3,
                description: 'task is this one',
            },
            address: {
                road: 'Calle cervantes',
                number: 3,
                city: 'Almussafes',
                state: '',
            },
            rooms: 3,
        })
        return users
    })
    .then(users => {
        Places.create({
            name: 'Calle de la iglesia',
            image: 'https://res.cloudinary.com/dnpvaaivi/image/upload/v1625781158/project/j2hxi2lp1zkvukel9s19.png',
            host_id: users[1]._id,
            task_info: {
                name: 'cosas de pueblo',
                working_hours: 1,
                description: 'cortar le??a, pasear cabras, aburrirte',
            },
            address: {
                road: 'Calle de la iglesia',
                number: 37,
                city: 'Maranchon',
                state: '',
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
