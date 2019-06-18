
exports.up = function(knex, Promise) {
  return knex.schema.createTable('ratings', table => {
    table.integer('rate');
    table.integer('memberId');
    table.integer('movieId');

    table.primary(['memberId', 'movieId']);
    table.foreign('memberId').references('userId').inTable('members');
    table.foreign('movieId').references('roundId').inTable('movies');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ratings');
};
