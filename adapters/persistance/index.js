const KnexRepos = require('./knex');

module.exports = (type) => {
  switch (type) {
    case 'knex':
      return KnexRepos;
    default:
      return {};
  }
};
