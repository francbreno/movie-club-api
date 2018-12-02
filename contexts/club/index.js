module.exports = (repo) => {
  const indicationRepo = repo('./indication');
  const movieRepo = repo('./movie');

  const allIndications = () => {

  };

  const newIndication = (movie, user) => {

  };

  const currentIndication = () => {

  };

  const rateIndication = (movie, user, rating) => {

  };

  const watchIndication = (indication, user) => {

  };

  const debitsFromIndication = (indication) => {

  };

  const payDebit = (debit, user) => {

  };

  const allDebits = () => {

  };


  return {
    allIndications,
    newIndication,
    rateIndication,
    watchIndication,
    debitsFromIndication,
    payDebit,
    currentIndication,
  };
};
