const R = require('ramda');
const Token = require('./token');

const accounts = (credentialRepo, userRepo) => {
  const pickAuthPayload = R.pick(['id']);
  const extractUserId = R.prop('id');
  const checkUserPassword = R.curry(Credential.check);
  const allUsers = () => User.getAll();
  const findUserByEmail = User.findByEmail;
  const getUserById = User.getById;

  const register = R.pipe(
    User.sanitize,
    User.validateForRegistration,
    userRepo.save,
    R.then(credentialRepo.save),
    R.then(pickAuthPayload),
    R.then(Token.generateToken),
  );

  const findUserByToken = R.pipe(
    Token.verifyToken,
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

module.exports = R.curry(accounts);
