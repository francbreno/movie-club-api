const Joi = require('joi');
const tmdbAPI = require('../externalMovieSearch/tmdb');

let instance = null;

module.exports = (repo) => {
  if (instance) return instance;

  const movieRepo = repo('movies');

  const create = (movie) => {
    return movieRepo.create(movie).returning('id');
  };

  instance = {
    create,
  };
  return instance;
};
