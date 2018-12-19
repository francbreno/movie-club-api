module.exports = (repo) => {
  const roundRepo = repo('./round');
  const movieRepo = repo('./movie');

  const allRounds = () => {

  };

  const newRound = (movie, user) => {

  };

  const currentRound = () => {

  };

  const rateRound = (movie, user, rating) => {

  };

  const watchRound = (indication, user) => {

  };

  const debitsFromRound = (indication) => {

  };

  const payDebit = (debit, user) => {

  };

  const allDebits = () => {

  };


  return {
    allRounds,
    newRound,
    rateRound,
    watchRound,
    debitsFromRound,
    payDebit,
    currentRound,
  };
};
