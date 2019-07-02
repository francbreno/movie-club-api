
exports.up = function(knex, Promise) {
  return knex.schema.createTable('members', table => {
    table.integer('id').primary();
    table.integer('clubId');

    table.foreign('clubId').references('id').inTable('clubs');
    table.foreign('id').references('id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('members');
};
