
exports.up = function (knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments()
        tbl.string('name').notNull()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
};
