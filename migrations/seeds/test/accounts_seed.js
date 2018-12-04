const users = [
  {
    name: 'John Milton',
    username: 'johnmilton',
    credential: {
      email: 'milton.john@gmail.com',
      password: 'p@radi5eL0st',
    },
  },
  {
    name: 'Bernard Cornwell',
    username: 'littlebernard',
    credential: {
      email: 'cornwell@writters.com',
      password: 'arthur4Ever',
    },
  },
];

const insertAccount = (knex, user) => {
  const { credential, ...userData } = user;
  return knex('users').insert(userData).first()
    .then(insertedUser => knex('credentials').insert({ ...credential, insertedUser_id: insertedUser.id }));
};

exports.seed = function seed(knex, Promise) {
  return knex('credentials').del()
    .then(knex('users'))
    .then(() => Promise.all(users.map(insertAccount)));
};
