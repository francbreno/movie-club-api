const R = require('ramda');
const Round = require('../core/club/round');
const Club = require('../core/club/club');

module.exports = ({ RoundRepo, MemberRepo, ClubRepo }) => {
  async function getAllRoundsUntilNow() {
    return RoundRepo.findAll();
  }

  async function getCurrentRoundDetails() {
    const rounds = await RoundRepo.findRoundWhereDeadlineIsNotDefined();

    if (!rounds) { // TODO - if not array of is empty then error
      throw new Error("There's no round open");
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

  async function indicateMovieToCurrentRound(memberId, movie) {
    // there must be an open round
    // the member must own the round
    // the movie must not have been indicated before
    // the movie data must be saved
  }

  async function watchRound(roundId, memberId) {
    const round = await RoundRepo.findById(roundId);

    if (!roundId) {
      throw Error('Round not found!');
    }

    const member = await MemberRepo.findById(memberId);

    if (!memberId) {
      throw Error('member not found!');
    }

    if (!ClubRepo.isMember(round.clubId, memberId)) {
      throw Error("Member is not part of the round's club!");
    }

    // TODO - Check deadline

    return R.pipe(
      R.curry(Round.watch)(round),
      RoundRepo.update,
    )(member);
  }

  async function startANewRound(clubId) {
    // The round is open by a system process
    // The round is part of a club
    const club = ClubRepo.findById(clubId);
    // there can be only one open round
    // must define to which member the round belongs, so this member can define the round's movie
    const position = Club.nextRoundPosition();
    const member = MemberRepo.findMemberByPosition(clubId, position);
    const [updatedClub, round] = Club.startANewRound(club, member);

    ClubRepo
      .query()
      .upsertGraph(updatedClub, {
        noInsert: ['owner', 'members'],
        noUpdate: ['owner', 'members', 'rounds'],
        noDelete: ['owner', 'members', 'rounds'],
      });

    return round;
  }

  return {
    startANewRound,
    getAllRoundsUntilNow,
    getCurrentRoundDetails,
    getRoundDetails,
    indicateMovieToCurrentRound,
    watchRound,
  };
};
