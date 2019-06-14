const { Model } = require('objection');

class Rating extends Model {
  static get tableName() {
    return 'rounds';
  }

  static get relationMappings() {
    return {
      movie: {
        relation: Model.HasOneRelation,
        modelClass: 'Movie',
        join: {
          from: 'rounds.id',
          to: 'movies.roundId',
        },
      },
      indicatedBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'Member',
        join: {
          from: 'rounds.memberId',
          to: 'members.id',
        }
      }
    };
  }
}

module.exports = Rating;
