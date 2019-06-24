const R = require('ramda');

module.exports = ({ RoundRepo }) => {
  async function findAllRounds() {
    return RoundRepo.findAll();
  }

  async function findCurrentRound() {
    const rounds = await RoundRepo.findRoundWhereDeadlineIsNotDefined();

    if (!rounds) { // TODO - if not array of is empty then error
      throw new Error(`There's no round open`);
    }
    return rounds;
  }

  async function getRoundDetails(id) {
    const round = await RoundRepo.findById(id);

    if (!round) {
      throw new Error(`Round not found with id ${id}`);
    }

    return round;
  }

  async function indicateRoundWatched(userId, roundId) {
    const round = await RoundRepo.findById(roundId);

    if (!round) {

    }

    if (round.deadline) {

    }

    

    return RoundRepo.update();
  }

  return {
    findAllRounds,
    findCurrentRound,
    getRoundDetails,
    indicateRoundWatched,
  };
};
