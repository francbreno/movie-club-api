const bcrypt = require('bcryptjs');

function encode(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(12));
}

function validate(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = {
  encode,
  validate,
};
