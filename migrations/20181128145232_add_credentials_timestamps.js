
exports.up = function (knex, Promise) {
  return knex.schema.table('credentials', (table) => {
    table.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('credentials', (table) => {
    table.dropTimestamps();
  });
};
