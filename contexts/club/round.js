const Joi = require('joi');
const ValidationError = require('../../utils/ValidationError');

let instance = null;

module.exports = (repoProvider) => {
  if (instance) return instance;

  const repo = repoProvider('rounds');

  const schema = Joi.object().keys({
    user_id: Joi.number().greater(0).required(),
    movie_id: Joi.number().greater(0).required(),
  });

  const validate = (round) => {
    const { error } = schema.validate(round, { abortEarly: false });
    if (error) {
      throw new ValidationError(error.details.map(e => e.message), 400);
    }
    return round;
  };

  const sanitize = round => round;

  const create = async (round) => {
    const [createdRound] = await repo.create(round);
    if (!createdRound) {
      throw new Error('Error creating new round');
    }
    return createdRound;
  };

  instance = {
    ...repo,
    sanitize,
    create,
    validate,
  };

  return instance;
};
