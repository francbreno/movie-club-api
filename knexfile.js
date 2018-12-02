// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      port: 5445,
      database: 'movie_club_dev',
      user: 'homemPeludoChorando',
      password: 'n@oTem0sVagAs',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './migrations/seeds/dev',
    },
    debug: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

};
