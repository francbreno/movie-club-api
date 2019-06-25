const R = require('ramda');
const Credential = require('../core/accounts/credential');
const User = require('../core/accounts/user');
const Token = require('../adapters/security/token');

module.exports = ({ RoundRepo, UseRepo }) => {
  const pickAuthPayload = R.pick(['userId']);

  function checkPassword(password, credential) {
    if (!Credential.checkPassword(password, credential.passwordHash)) {
      throw Error('Invalid password/username!');
    }

    return credential;
  }

  function loginWithUsernameAndPassword(username, password, { CredentialRepo }) {
    return R.pipe(
      CredentialRepo.getCredentialByEmail,
      R.then(R.not(R.empty)),
      checkPassword(password),
      pickAuthPayload,
      Token.generate,
    )(username);
  }

  function registerNewUser(user, { CredentialRepo, UserRepo }) {
    const pickCredentials = R.pick(['credentials']);

    return R.pipe(
      User.validateForRegistration,
      Credential.putPasswordHash,
      UserRepo.save,
      R.then(pickCredentials),
      R.then(CredentialRepo.save),
      R.then(pickAuthPayload),
      Token.generate,
    )(user);
  }

  return {
    loginWithUsernameAndPassword,
    registerNewUser,
    getUserById: UseRepo.findById,
  };
};
