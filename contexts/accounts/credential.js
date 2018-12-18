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

  const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

  const generateToken = (payload) => {
    const tokenConfig = {
      expiresIn: TOKEN_EXPIRATION_TIME,
    };
    return jwt.sign(payload, process.env.SECRET_KEY, tokenConfig);
  };

  const checkPassword = (password, hash) => bcrypt.compareSync(password, hash);

  const checkUser = (password, user) => {
    if (user && checkPassword(password, user.credential.password_hash)) {
      console.log('user is valid!');
      return user;
    }
    console.log('data', password, user);
    throw new Error('Invalid email and/or password');
  };

  const validate = credential => schema.validate(credential, { abortEarly: false });

  const putPasswordHash = (credential) => {
    const password_hash = hashPassword(credential.password);
    return { ...credential, password_hash };
  };

  const verifyToken = (token) => {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    return id;
  };

  const create = (user) => {
    putPasswordHash(user.credential);
    const { email, password_hash, user_id } = user.credential;
    return repo.create({ email, password_hash, user_id });
  };

  instance = {
    ...repo,
    validate,
    putPasswordHash,
    verifyToken,
    generateToken,
    checkUser,
    create,
    schema,
  };

  return instance;
};
