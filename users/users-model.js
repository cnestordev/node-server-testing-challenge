const db = require('../data/connections')

module.exports = {
    findAll,
    addUser
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