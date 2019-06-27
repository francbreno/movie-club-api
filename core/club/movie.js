function create(movieData) {
  return {
    round: null,
    ...movieData,
    ratings: [],
  };
}

function setMovieInARound(movie, round) {
  if (!round.active) {
    throw Error('The round must be active');
  }

  return {
    ...movie,
    round,
  };
}

function rate(movie, member, rating) {
  if (rating < 1 || rating > 5) {
    throw Error('Rating must be an integer value between 1 and 5');
  }

  return {
    ...movie,
    ratings: [
      ...movie.ratings,
      { member, rating },
    ],
  };
}

module.exports = {
  create,
  setMovieInARound,
  rate,
};
