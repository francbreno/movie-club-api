
exports.up = function(knex, Promise) {
  return knex.schema.createTable('credentials', table => {
    table.increments('id');
    table.integer('userId').unsigned().notNullable();
    table.string('username').notNullable();
    table.string('passwordHash').notNullable();
    table.boolean('active');

    table.foreign('userId').references('id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('credentials');
};
