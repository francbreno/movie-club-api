const R = require('ramda');
const Credential = require('../core/accounts/credential');
const User = require('../core/accounts/user');
const Token = require('../core/accounts/token');

const pickAuthPayload = R.pick(['userId']);

function loginWithUsernameAndPassword(username, password, { CredentialRepo }) {
  return R.pipe(
    // find user by username
    CredentialRepo.getCredentialByEmail,
    R.then(R.not(R.empty)),
    Credential.checkPassword(password),
    pickAuthPayload,
    Token.generateToken,
  )(username);
}

function registerNewUser(user, { CredentialRepo, UserRepo }) {
  const pickCredentials = R.pick(['credentials']);

  return R.pipe(
    User.validateForRegistration,
    UserRepo.save,
    R.then(pickCredentials),
    R.then(CredentialRepo.save),
    R.then(pickAuthPayload),
    Token.generateToken,
  )(user);
}

module.exports = {
  loginWithUsernameAndPassword,
  registerNewUser,
};
