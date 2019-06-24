function rate(movie, member, rating) {
  return {
    ...movie,
    ratings: [
      ...movie.ratings,
      { member, rating },
    ],
  };
}

module.exports = {
  rate,
};
