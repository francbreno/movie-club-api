
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('animals').del()
    .then(function () {
      // Inserts seed entries
      return knex('animals').insert([
        {id: 1, name: 'Jax', kind: 'Dog', breed: 'pinscher', ownerId: 1},
        {id: 2, name: 'Kitty', kind: 'Cat', breed: 'siamese', ownerId: 3},
      ]);
    });
};
