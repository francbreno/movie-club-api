const R = require('ramda');
const userCreator = require('./user');
const credentialCreator = require('./credential');

module.exports = (repo) => {
  const Credential = credentialCreator(repo);
  const User = userCreator(repo);

  const pickAuthData = credential => R.pick(['email', 'password']);
  const isValidUserForGivenPassword = R.curry(Credential.isUserValid);

  const allUsers = () => User.all();

  const register = user => R.pipe(
    User.sanitize,
    User.validateForRegistration,
    User.create,
    R.then(Credential.create),
    R.then(pickAuthData),
    Credential.generateToken,
  )(user);

  const findUserByEmail = email => User.findByEmail(email);

  const validateToken = token => token;

  const loginWithEmailAndPassword = (email, password) => R.pipe(
    findUserByEmail,
    R.then(isValidUserForGivenPassword(password)),
    R.then(pickAuthData),
    Credential.generateToken,
  )(email);

  return {
    register,
    validateToken,
    loginWithEmailAndPassword,
    allUsers,
  };
};
