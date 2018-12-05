const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'John Milton',
    user_name: 'johnmilton',
    credential: {
      email: 'milton.john@gmail.com',
      password_hash: bcrypt.hashSync('p@radi5eL0st', bcrypt.genSaltSync()),
    },
  },
  {
    name: 'Bernard Cornwell',
    user_name: 'littlebernard',
    credential: {
      email: 'cornwell@writters.com',
      password_hash: bcrypt.hashSync('arthur4Ever', bcrypt.genSaltSync()),
    },
  },
];

exports.seed = function seed(knex, Promise) {
  const insertAccount = (user) => {
    const { credential, ...userData } = user;
    return knex('users').insert(userData).returning('id')
      .then(([id]) => knex('credentials').insert({
        ...credential,
        user_id: id,
      }));
  };

  return knex('credentials').del()
    .then(knex('users').del())
    .then(() => Promise.all(users.map(insertAccount)));
};
