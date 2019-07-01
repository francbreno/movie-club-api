
exports.up = function(knex, Promise) {
  return knex.schema.createTable('rounds', table => {
    table.increments('id');
    table.integer('clubId');
    table.integer('memberId');
    table.datetime('deadline');


    table.foreign('memberId').references('id').inTable('members');
    table.foreign('clubId').references('id').inTable('clubs');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rounds');
};
