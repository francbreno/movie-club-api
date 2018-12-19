
exports.up = function up(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('user_name').unique().notNullable();
    table.timestamps(true, true);
  }).then(() => knex.schema.createTable('credentials', (table) => {
    table.increments();
    table.string('email').unique().notNullable();
    table.string('password_hash');
    table.timestamps(true, true);

    table.integer('user_id').references('id').inTable('users');
  })).then(() => knex.schema.createTable('movies', (table) => {
    table.string('title').unique().notNullable();
    table.increments();
    table.timestamps(true, true);

    table.integer('user_id').references('id').inTable('users');
    table.integer('movie_id').references('id').inTable('movies');
  })).then(() => knex.schema.createTable('rounds', (table) => {
    table.increments();
    table.timestamps(true, true);

    table.integer('user_id').references('id').inTable('users');
    table.integer('movie_id').references('id').inTable('movies');
  }));
};

exports.down = function down(knex, Promise) {
  return knex.schema.dropTable('credentials').then(() => knex.schema.dropTable('users'));
};
