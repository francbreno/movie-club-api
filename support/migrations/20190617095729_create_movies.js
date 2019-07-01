
exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', table => {
    table.integer('id').primary();
    table.integer('clubId');
    table.string('name');
    table.string('email');

    table.foreign('id').references('id').inTable('rounds');
    table.foreign('clubId').references('id').inTable('clubs');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('movies');
};
