
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.integer('id').primary();
    table.string('firstName');
    table.string('lastName');
    table.date('birthDate');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
