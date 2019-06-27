const Credential = require('./Credential');

module.exports = (baseRepo) => {
  async function getCredentialByEmail(email) {
    return Credential
      .query()
      .where('username', email);
  }

  return {
    ...baseRepo(Credential),
    getCredentialByEmail,
  };
};
