const db = require('../config/db');
const repo = require('./repo')(db);
const accounts = require('./accounts')(repo);
const club = require('./club')(repo);

module.exports = {
  accounts,
  club,
};
