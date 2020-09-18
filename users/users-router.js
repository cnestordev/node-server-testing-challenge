const express = require('express')
const router = express.Router()

const db = require('../data/connections')
const { findAll, addUser, removeUser } = require('../users/users-model')

router.get('/', (req, res) => {
    findAll()
        .then(users => {
            res.status(200).json({ message: users })
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
})

router.post('/', (req, res) => {
    addUser(req.body)
        .then(user => {
            res.status(201).json({ data: user })
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)

    removeUser(id)
        .then(id => {
            if (id) {
                res.status(201).json({ message: 'successfully deleted user' })
            } else {
                res.status(404).json({ message: 'no user with that id exists' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
})

module.exports = router