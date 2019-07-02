
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('members').del()
    .then(function () {
      // Inserts seed entries
      return knex('members').insert([
        {id: 1, clubId: 1 },
        {id: 2, clubId: 1 },
        {id: 3, clubId: 1 }
      ]);
    });
};
