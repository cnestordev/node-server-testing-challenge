
exports.up = function (knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments()
        tbl.text('name').notNull().unique()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
};
