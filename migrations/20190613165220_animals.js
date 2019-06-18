
exports.up = function(knex, Promise) {
  return knex.schema.createTable('animals', table => {
    table.increments('id');
    table.string('name');
    table.integer('age');
    table.string('kind');
    table.string('breed');

    // FKs
    table.integer('ownerId');
  });
};

exports.down = function(knex, Promise) {
  
};
