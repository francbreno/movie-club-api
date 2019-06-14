const { Model } = require('objection');

class Movie extends Model {
  static get tableName() {
    return 'movies';
  }

  static get relationMappings() {
    return {
      ratings: {
        relation: Model.HaManyRelation,
        modelClass: 'Movie',
        join: {
          from: 'movies.id',
          to: 'ratings.movieId',
        },
      },
      round: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'Round',
        join: {
          from: 'movies.roundId',
          to: 'rounds.id',
        }
      }
    };
  }
}

module.exports = Movie;
