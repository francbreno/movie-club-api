const R = require('ramda');
const userCreator = require('./user');
const credentialCreator = require('./credential');

module.exports = (repo) => {
  const Credential = credentialCreator(repo);
  const User = userCreator(repo);

  const pickAuthData = R.pick(['user_id']);
  const checkUserPassword = R.curry(Credential.check);
  const allUsers = () => User.getAll();
  const findUserByEmail = User.findByEmail;
  const getUserById = User.getById;

  const register = R.pipe(
    User.sanitize,
    User.validateForRegistration,
    User.register,
    R.then(Credential.create),
    R.then(pickAuthData),
    R.then(Credential.generateToken),
  );

  const findUserByToken = R.pipe(
    Credential.verifyToken,
    pickAuthData,
    R.prop('user_id'),
    getUserById,
  );

  const loginWithEmailAndPassword = (email, password) => R.pipe(
    findUserByEmail,
    R.then(checkUserPassword(password)),
    R.then(pickAuthData),
    R.then(Credential.generateToken),
  )(email);

  return {
    register,
    findUserByToken,
    loginWithEmailAndPassword,
    allUsers,
    getUserById,
  };
};
