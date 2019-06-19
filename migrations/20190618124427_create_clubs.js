
exports.up = function(knex, Promise) {
  return knex.schema.createTable('clubs', table => {
    table.increments('id');
    table.string('name');
    table.integer('userId').unsigned().notNullable();

    table.foreign('userId').references('id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('clubs');
};
