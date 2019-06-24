function start(member, movie = null, deadline) {
  return {
    member,
    movie,
    deadline,
  };
}

function setMovie(round, movie) {
  return {
    ...round,
    movie,
  };
}

function finish(round, date) {
  return {
    ...round,
    deadline: date,
  };
}

function watch(round, member) {
  return {
    ...round,
    watchedBy: [
      ...round.watchedBy,
      member,
    ],
  };
}

module.exports = {
  start,
  finish,
  setMovie,
  watch,
};
