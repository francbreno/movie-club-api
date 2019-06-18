
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rounds').del()
    .then(function () {
      // Inserts seed entries
      return knex('rounds').insert([
        {id: 1, memberId: 1, deadline: new Date()},
      ]);
    });
};
