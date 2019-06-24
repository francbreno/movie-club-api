const Round = require('./models/Round');

module.exports = (baseRepo) => {
  async function findRoundWhereDeadlineIsNotDefined() {
    return Round
      .query()
      .where('deadline', null);
  }

  return {
    ...baseRepo,
    findRoundWhereDeadlineIsNotDefined,
  };
};
