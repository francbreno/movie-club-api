
exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', table => {
    table.integer('roundId').primary();
    table.string('name');
    table.string('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('movies');
};
