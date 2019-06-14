const { Model } = require('objection');

class Round extends Model {
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
        },
      },
      watchedBy: {
        relation: Model.ManyToManyRelation,
        modelClass: 'Member',
        from: 'rounds.id',
        through: {
          from: 'rounds_members.roundId',
          to: 'rounds_members.memberId',
        },
        to: 'members.id',
      }
    };
  }
}

module.exports = Round;
