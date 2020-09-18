const db = require('../data/connections')

module.exports = {
    findAll,
    addUser,
    removeUser
}

async function findAll() {
    const users = await db('users')
    return users
}

async function addUser(body) {

    const [id] = await db('users').insert(body)
    console.log(id)
    const [user] = await db('users').where({ id })

    return user
}

async function removeUser(id) {
    const response = await db('users').where({ id }).del()
    return response
}