const R = require('ramda');
const userCreator = require('./user');
const credentialCreator = require('./credential');

module.exports = (repo) => {
  const Credential = credentialCreator(repo);
  const User = userCreator(repo);

  const pickAuthData = credential => R.pick(['email', 'password']);
  const isUserValidForGivenPassword = R.curry(Credential.isUserValid);

  const allUsers = () => User.getAll();
  const findUserByEmail = email => User.findByEmail(email);

  const register = R.pipe(
    User.sanitize,
    User.validateForRegistration,
    User.register,
    R.then(Credential.create),
    R.then(pickAuthData),
    Credential.generateToken,
    Promise.resolve.bind(Promise),
  );

  const validateToken = token => R.pick(
    Credential.verifyToken,
    User.getById,
    R.complement(R.not),
  )(token);

  const loginWithEmailAndPassword = (email, password) => R.pipe(
    findUserByEmail,
    R.then(isUserValidForGivenPassword(password)),
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
