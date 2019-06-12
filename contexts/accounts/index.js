const R = require('ramda');
const Token = require('./token');
const userCreator = require('./user');
const credentialCreator = require('./credential');

module.exports = (repo) => {
  const Credential = credentialCreator(repo);
  const User = userCreator(repo);

  const pickAuthPayload = R.pick(['id']);
  const extractUserId = R.prop('id');
  const checkUserPassword = R.curry(Credential.check);
  const allUsers = () => User.getAll();
  const findUserByEmail = User.findByEmail;
  const getUserById = User.getById;

  const register = R.pipe(
    User.sanitize,
    User.validateForRegistration,
    User.register,
    R.then(Credential.create),
    R.then(pickAuthPayload),
    R.then(Token.generateToken),
  );

  const findUserByToken = R.pipe(
    Token.VerifyToken,
    extractUserId,
    getUserById,
  );

  const loginWithEmailAndPassword = (email, password) => R.pipe(
    findUserByEmail,
    R.then(checkUserPassword(password)),
    R.then(pickAuthPayload),
    R.then(Token.generateToken),
  )(email);

  return {
    register,
    findUserByEmail,
    findUserByToken,
    loginWithEmailAndPassword,
    allUsers,
    getUserById,
  };
};
