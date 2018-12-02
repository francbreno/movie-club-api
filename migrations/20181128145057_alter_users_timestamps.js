
exports.up = function (knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.dropTimestamps();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.timestamps();
  });
};
