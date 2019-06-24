
exports.up = function(knex, Promise) {
  return knex.schema.createTable('members', table => {
    table.integer('userId').primary();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('members');
};
