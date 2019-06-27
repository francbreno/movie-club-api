const { merge } = require('ramda');
const Round = require('./round');

function isAClubMember(club, user) {
  return club.members.find(m => m.userId === user.id);
}

function isNotAClubMember(club, user) {
  return !isAClubMember(club, user);
}

function create(title, founder, users) {
  const founderMember = { userId: founder.id };
  return {
    title,
    founder,
    members: [...users.map(u => ({ userId: u.id })), founderMember],
  };
}

function addMember(club, user) {
  if (isAClubMember(club, user)) {
    throw Error('User already in the club');
  }

  return merge(club, { members: [...club.members, { userId: user.id }] });
}

function removeMember(club, user) {
  if (isNotAClubMember(club, user)) {
    throw Error("It's not a club member");
  }

  return {
    ...club,
    members: club.members.filter(m => m.userId !== user.id),
  };
}

function addRound(club, round) {
  return merge(club, { rounds: [...club.rounds, round] });
}

function startANewRound(club, member) {
  if (isNotAClubMember(club, { id: member.userId })) {
    throw Error("It's not a club member");
  }

  const round = Round.create(club, member, null, Date.now());
  const updatedClub = addRound(club, round);
  return [updatedClub, round];
}

function nextRoundOwner(club, clubRepo) {
  const owner = clubRepo.findNextRoundOwner(club.id, currentRoundPosition);
}

module.exports = {
  addMember,
  removeMember,
  addRound,
  create,
  startANewRound,
};
