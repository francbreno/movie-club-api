const R = require('ramda');
const roundCreator = require('./round');

module.exports = (repo) => {
  const Round = roundCreator(repo);

  const allRounds = Round.getAll;

  return {
    allRounds,
  };
};
