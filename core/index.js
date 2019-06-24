const db = require('../config/db');
const repo = require('../persistance/knex/repo')(db);
const accounts = require('./accounts')(repo);
const club = require('./club')(repo);
const externalMovieSearch = require('./externalMovieSearch');


module.exports = {
  accounts,
  club,
  externalMovieSearch,
};
