const R = require('ramda');
const userCreator = require('./user');
const credentialCreator = require('./credential');

module.exports = (repo) => {
  const Credential = credentialCreator(repo);
  const User = userCreator(repo);

  const pickAuthData = credential => R.pick(['id']);
  const checkUserPassword = R.curry(Credential.checkUser);

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

  const findUserByToken = token => R.pipe(
    Credential.verifyToken,
    User.getById,
    Promise.resolve.bind(Promise),
  )(token);

  const loginWithEmailAndPassword = (email, password) => R.pipe(
    findUserByEmail,
    R.then(checkUserPassword(password)),
    R.then(pickAuthData),
    Credential.generateToken,
    Promise.resolve.bind(Promise),
  )(email);

  const getUserById = (id) => {
    return User.getById(id);
  };

  return {
    register,
    findUserByToken,
    loginWithEmailAndPassword,
    allUsers,
    getUserById,
  };
};
