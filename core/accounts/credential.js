const Joi = require('joi');
const PasswordEncoder = require('../../adapters/security/passwordEncoder');

const schema = Joi.object().keys({
  username: Joi.string().email().required(),
  password: Joi.string().trim().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/).required()
    .error(() => 'Password must contain at least one number, one lowercase and one uppercase letter and at least six characters that are letters, numbers or the underscore'),
});

const hashPassword = password => PasswordEncoder.encode(password);
const checkPassword = (password, hash) => PasswordEncoder.validate(password, hash);

const validate = credential => schema.validate(credential, { abortEarly: false });

const putPasswordHash = (credential) => {
  const passwordHash = hashPassword(credential.password);
  return { ...credential, passwordHash };
};

module.exports = {
  checkPassword,
  putPasswordHash,
};
