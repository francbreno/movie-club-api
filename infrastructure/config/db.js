const knexConfig = require('../../knexfile');

module.exports = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);
