const Club = require('./Club');

module.exports = (baseRepo) => {
  async function findNextRoundOwner(clubId) {
    return Club
      .query()
      .where('id', clubId);
  }

  return {
    ...baseRepo(Club),
    findNextRoundOwner,
  };
};
