
exports.up = function(knex, Promise) {
  return knex.schema.createTable('rounds', table => {
    table.increments('id');
    table.integer('memberId');
    table.datetime('deadline');

    table.foreign('memberId').references('userId').inTable('members');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rounds');
};
