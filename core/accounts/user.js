const Joi = require('joi');
const ValidationError = require('../../utils/ValidationError');
const Credential = require('./credential');

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

module.exports = {
  schemaForRegistration,
  validateForRegistration,
  sanitize,
};
