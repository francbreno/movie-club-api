
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ratings').del()
    .then(function () {
      // Inserts seed entries
      return knex('ratings').insert([
        {memberId: 1, movieId: 1, rate: 5, },
        {memberId: 2, movieId: 1, rate: 2, },
        {memberId: 3, movieId: 1, rate: 3, },
      ]);
    });
};
