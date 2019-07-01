const Round = require('./Round');

module.exports = (baseRepo) => {
  async function findCurrentRound() {
    return Round
      .query()
      .where('active', true);
  }

  return {
    ...baseRepo(Round),
    findCurrentRound,
  };
};
