
exports.up = function(knex, Promise) {
  return knex.schema.createTable('ratings', table => {
    table.integer('memberId');
    table.integer('movieId');
    table.integer('clubId');
    table.integer('rate');

    table.primary(['memberId', 'movieId']);
    table.foreign('memberId').references('id').inTable('members');
    table.foreign('movieId').references('id').inTable('movies');
    table.foreign('clubId').references('id').inTable('clubs');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ratings');
};
