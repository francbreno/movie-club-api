const BaseModel = require('./baseModel');

class Movie extends BaseModel {
  static get tableName() {
    return 'movies';
  }

  static get relationMappings() {
    return {
      ratings: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'Movie',
        join: {
          from: 'movies.id',
          to: 'ratings.movieId',
        },
      },
      round: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'Round',
        join: {
          from: 'movies.id',
          to: 'rounds.id',
        }
      }
    };
  }
}

module.exports = Movie;
