const R = require('ramda');
const roundCreator = require('./round');

module.exports = (repo) => {
  const Round = roundCreator(repo);

  const allRounds = Round.getAll;

  const getCurrentRound = () => {
    return Round.getCurrentRound();
  };

  const startNewRound = (memberId, movieId) => {
    // check if member exists
    // if so then check if movie exists
    // if so then check if there's an open round
    // if so then open a new round that ends in the next week
  };

  const closeRound = (roundId) => {
    // look for the round
    // if found then check if it's open
  };

  const watchRound = (memberId, roundId) => {
    // look for the round
    // if found then check if round is open
    // if it is then put that round have been watched by the user
  };

  const rateMovie = (memberId, movieId, rating) => {
    // look for the member id
    // if found then look for the movie
    // if found then check if rating is valid
    // if it is then save the rating for the movie
  };

  const getMemberIndications = (memberId) => {
    // look for rounds indicated by the member id provided
  };

  const getTopMovies = () => {
    // look for the top 5 rated movies 
  };

  return {
    getCurrentRound,
    allRounds,
    startNewRound,
    closeRound,
    watchRound,
    rateMovie,
    getMemberIndications,
    getTopMovies,
  };
};
