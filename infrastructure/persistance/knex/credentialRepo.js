const Credential = require('./models/Credential');

async function getCredentialByEmail(email) {
  return Credential
    .query()
    .where('username', email);
}

module.exports = {
  getCredentialByEmail,
};
