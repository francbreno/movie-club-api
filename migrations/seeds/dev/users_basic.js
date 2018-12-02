
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => knex('users').insert([
      { id: 1, name: 'Francisco Breno Barbosa Soares', user_name: 'francbreno' },
      { id: 2, name: 'Joaquim Pinheiro Barbosa Soares', user_name: 'quimquim' },
      { id: 3, name: 'Débora Pinheiro Rodrigues', user_name: 'fonilda' },
    ]));
};
