const R = require('ramda');
const { isEmpty, trim, isEmail } = require('validator');

const testPassword = (password) => {
  // at least one number, one lowercase and one uppercase letter
  // at least six characters that are letters, numbers or the underscore
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
  return re.test(password);
};

exports.isInvalidEmail = R.compose(R.not, isEmail);
exports.isEmpty = R.pipe(trim, isEmpty);
exports.isInvalidPassword = R.pipe(trim, testPassword, R.not);
