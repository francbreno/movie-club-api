
exports.up = function (knex, Promise) {
  return knex.schema.createTable('credentials', (table) => {
    table.increments();
    table.string('email');
    table.string('password_hash');
    table.timestamps();

    table.integer('user_id').references('id').inTable('users');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('credentials');
};
