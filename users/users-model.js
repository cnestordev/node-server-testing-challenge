const db = require('../data/db-config')

module.exports = {
    findAll,
    addUser,
    findById,
    removeUser
}

function findAll() {
    return db('users')
}

function addUser(body) {
    return db('users')
        .insert(body)
}

function findById(id) {
    return db('users')
        .where({ id })
}

function removeUser(id) {
    return db('users')
        .where({ id })
        .del()
}