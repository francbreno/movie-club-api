
exports.up = function (knex, Promise) {
  return knex.schema.table('credentials', (table) => {
    table.dropTimestamps();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('credentials', (table) => {
    table.timestamps();
  });
};
