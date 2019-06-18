
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('clubs').del()
    .then(function () {
      // Inserts seed entries
      return knex('clubs').insert([
        {id: 1, name: 'Clube do Filme', userId: 1},
      ]);
    });
};
