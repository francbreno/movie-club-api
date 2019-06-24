
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rounds_members').del()
    .then(function () {
      // Inserts seed entries
      return knex('rounds_members').insert([
        {roundId: 1, memberId: 1},
        {roundId: 1, memberId: 3},
      ]);
    });
};
