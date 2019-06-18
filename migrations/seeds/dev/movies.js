
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([
        {roundId: 1, title: 'The Matrix', year: 1999},
      ]);
    });
};
