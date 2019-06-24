
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, firstName: 'Jack', lastName: 'Nicholson', birthDate: new Date('01-01-1946')},
        {id: 2, firstName: 'John', lastName: 'Doe', birthDate: new Date('11-10-1999')},
        {id: 3, firstName: 'Mary', lastName: 'Smith', birthDate: new Date('05-22-2005')},
      ]);
    });
};
