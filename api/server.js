const express = require('express')
const app = express()

const db = require('../data/db-config')

const { findAll, addUser, findById, removeUser } = require('../users/users-model')

app.use(express.json())

//get request to get all users for postman testing
app.get('/users', (req, res) => {
    db('users')
        .then(users => {
            res.status(201).json({ data: users })
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
})

app.get('/', (req, res) => {
    findAll()
        .then(users => {
            res.status(200).json({ api: "up" })
        })
        .catch(err => {
            res.status(500).end()
        })
})

app.post('/', (req, res) => {
    if (req.body.name) {
        addUser()
            .insert(req.body, "id")
            .then(([id]) => {
                findById(id)
                    .then(([user]) => {
                        res.status(201).json(user)
                    })
            })
            .catch(err => {
                res.status(400).end()
            })
    } else {
        res.status(400).end()
    }
})

app.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    removeUser(id)
        .then(id => {
            if (id) {
                res.status(201).json({ data: id })
            } else {
                res.status(404).end()
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

module.exports = app