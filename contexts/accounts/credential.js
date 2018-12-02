const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const TOKEN_EXPIRATION_TIME = 30 * 24 * 60 * 60 * 1000;

let instance = null;

module.exports = (repoProvider) => {
  if (instance) return instance;

  const repo = repoProvider('credentials');

  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().trim().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/).required()
      .error(() => 'Password must contain at least one number, one lowercase and one uppercase letter and at least six characters that are letters, numbers or the underscore'),
  });

  const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync());

  const generateToken = (email, password) => {
    const tokenConfig = {
      expiresIn: TOKEN_EXPIRATION_TIME,
    };
    return jwt.sign({}, 'secret', tokenConfig);
  };

  const checkPassword = (password, hash) => bcrypt.compare(password, hash);

  const isUserValid = (password, user) => {
    if (user && checkPassword(password, user.password_hash)) {
      return user;
    }
    throw new Error('Invalid email e/or password');
  };

  const validate = credential => schema.validate(credential, { abortEarly: false });

  const putPasswordHash = (credential) => {
    const password_hash = hashPassword(credential.password);
    return { ...credential, password_hash };
  };

  const create = (user) => {
    putPasswordHash(user.credential);
    const { email, password_hash, user_id } = user.credential;
    return repo.create({ email, password_hash, user_id });
  };

  instance = {
    validate,
    putPasswordHash,
    create,
    generateToken,
    isUserValid,
    schema,
  };

  return instance;
};
