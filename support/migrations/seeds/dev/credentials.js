
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('credentials').del()
    .then(function () {
      // Inserts seed entries
      return knex('credentials').insert([
        {id: 1, userId: 1, username: 'nicholson@gmail.com', passwordHash: '$2y$10$JhGaMhdsfagsKmeytlhrTufDpbQsTSaxllVkhkE1BgKuQ1OquBw2i', active: true},
        {id: 2, userId: 2, username: 'doe.john@microsoft.com', passwordHash: '$2y$10$JhGaMhdsfagsKmeytlhrTufDpbQsTSaxllVkhkE1BgKuQ1OquBw2i', active: true},
        {id: 3, userId: 3, username: 'marym@yahoo.com', passwordHash: '$2y$10$JhGaMhdsfagsKmeytlhrTufDpbQsTSaxllVkhkE1BgKuQ1OquBw2i', active: false},
      ]);
    });
};
