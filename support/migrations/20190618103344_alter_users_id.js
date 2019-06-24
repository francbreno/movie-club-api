

exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', table => {
    table.renameColumn('userId', 'id')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', table => {
    table.renameColumn('id', 'userId')
  });
};
