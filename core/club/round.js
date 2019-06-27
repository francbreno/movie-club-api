function create(club, member, deadline) {
  return {
    club,
    member,
    deadline,
    active: false,
    watchedBy: [],
  };
}

function setMovie(round, member, movie) {
  if (!round.active) {
    throw Error('The movie cannot be set because the round is not active');
  }

  if (round.member.userId !== member.userId) {
    throw Error('Only the owner of the round can set a movie');
  }

  return {
    ...round,
    movie,
  };
}

function finish(round) {
  return {
    ...round,
    active: false,
  };
}

function watch(round, member) {
  if (!round.active) {
    throw Error('An inactive round cannot be set as watched');
  }

  return {
    ...round,
    watchedBy: [
      ...round.watchedBy,
      member,
    ],
  };
}

module.exports = {
  create,
  finish,
  setMovie,
  watch,
};
