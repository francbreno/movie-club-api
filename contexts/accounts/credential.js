const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
      expiresIn: '1 week',
    };
    return jwt.sign(payload, process.env.SECRET_KEY, tokenConfig);
  };

  const verifyToken = token => jwt.verify(token, process.env.SECRET_KEY);

  const checkPassword = (password, hash) => bcrypt.compareSync(password, hash);

  const check = (password, user) => {
    if (user && checkPassword(password, user.credential.password_hash)) {
      return user;
    }
    throw new Error('Invalid email and/or password');
  };

  const validate = credential => schema.validate(credential, { abortEarly: false });

  const putPasswordHash = (credential) => {
    const password_hash = hashPassword(credential.password);
    return { ...credential, password_hash };
  };

  const create = async (user) => {
    const { email, password_hash } = putPasswordHash(user.credential);
    const [credential] = await repo.create({ email, password_hash, user_id: user.id }).returning('*');
    if (!credential) {
      throw new Error(`Error creating credential for user ${credential.user_id}`);
    }
    return credential;
  };

  instance = {
    ...repo,
    validate,
    putPasswordHash,
    verifyToken,
    generateToken,
    check,
    create,
    schema,
  };

  return instance;
};
