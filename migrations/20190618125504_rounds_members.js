
exports.up = function(knex, Promise) {
  return knex.schema.createTable('rounds_members', table => {
    table.integer('memberId').unsigned().notNullable();
    table.integer('roundId').unsigned().notNullable();

    table.foreign('memberId').references('userId').inTable('members');
    table.foreign('roundId').references('id').inTable('rounds');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rounds_members');
};
