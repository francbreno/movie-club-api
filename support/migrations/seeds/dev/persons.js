
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('persons').del()
    .then(function () {
      // Inserts seed entries
      return knex('persons').insert([
        {id: 1, name: 'Jack Kirby', email: 'kirby@marvel.com'},
        {id: 2, name: 'John Buscema', email: 'buscema@comics.com'},
        {id: 3, name: 'Frank Miller', email: 'miller@batman.com'}
      ]);
    });
};
