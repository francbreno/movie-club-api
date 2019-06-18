

exports.up = function(knex, Promise) {
  return knex.schema.alterTable('movies', table => {
    table.dropColumn('name', 'email');

    table.string('title');
    table.integer('year');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('movies', table => {
  table.dropColumn('title', 'year');

    table.string('name');
    table.string('email');
  });
};
