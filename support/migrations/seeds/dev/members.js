
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('members').del()
    .then(function () {
      // Inserts seed entries
      return knex('members').insert([
        {userId: 1, },
        {userId: 2, },
        {userId: 3, }
      ]);
    });
};
