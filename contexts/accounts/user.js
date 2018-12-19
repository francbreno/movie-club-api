const Joi = require('joi');
const credentialCreator = require('./credential');
const ValidationError = require('../../utils/ValidationError');

let instance = null;

module.exports = (repoProvider) => {
  if (instance) return instance;

  const repo = repoProvider('users');
  const Credential = credentialCreator(repoProvider);

  const schemaForRegistration = Joi.object().keys({
    name: Joi.string().trim().min(3)
      .required(),
    user_name: Joi.string().trim().alphanum().min(3)
      .required(),
    credential: Credential.schema,
  });

  const validateForRegistration = (user) => {
    const { error } = schemaForRegistration.validate(user, { abortEarly: false });
    if (error) {
      throw new ValidationError(error.details.map(e => e.message), 400);
    }
    return user;
  };

  const sanitize = user => user;

  const register = async (user) => {
    const { credential, ...userData } = user;
    const [createdUser] = await repo.create(userData);
    if (!createdUser) {
      throw new Error('Error creating new user');
    }
    return ({
      ...createdUser,
      credential: {
        ...credential,
        user_id: createdUser.id,
      },
    });
  };

  const findByEmail = async (email) => {
    const user = await repo
      .find({ email })
      .leftJoin(
        'credentials',
        'users.id',
        'credentials.user_id',
      )
      .select(
        'users.id as id', 'users.name as name', 'users.user_name as user_name',
        'credentials.email as email', 'credentials.password_hash as password_hash',
      )
      .first();
    if (!user) {
      throw new Error(`User not found with email ${email}`);
    }

    return {
      id: user.id,
      name: user.name,
      user_name: user.user_name,
      credential: {
        email: user.email,
        password_hash: user.password_hash,
        user_id: user.id,
      }
    };
  };

  instance = {
    ...repo,
    validateForRegistration,
    sanitize,
    register,
    findByEmail,
  };

  return instance;
};
