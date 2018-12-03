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
      throw new ValidationError(error.details.map(e => e.message));
    }
    return user;
  };

  const sanitize = user => user;

  const register = async (user) => {
    const { credential, ...userData } = user;
    const [id] = await repo.create(userData).returning('id');
    user.credential.user_id = id;
    return user;
  };

  const findByEmail = async (email) => {
    const user = await repo
      .find({ email })
      .leftJoin(
        'credentials',
        'users.id',
        'credentials.user_id',
      ).select(
        'users.id as id, users.name as name, users.user_name as user_name',
        'credentials.email as email, credentials.password_hash as password_hash',
      );
    return user;
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
