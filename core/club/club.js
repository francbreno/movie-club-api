function addMember(club, member) {
  return {
    ...club,
    members: [
      ...club.members,
      member,
    ],
  };
}

function removeMember(club, member) {
  return {
    ...club,
    members: club.members.filter(m => m.userId === member.userId),
  };
}

function addRound(club, round) {
  return {
    ...club,
    rounds: [
      ...club.rounds,
      round,
    ],
  };
}

module.exports = {
  addMember,
  removeMember,
  addRound,
};
