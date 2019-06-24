const BaseModel = require('./baseModel');

class Round extends BaseModel {
  static get tableName() {
    return 'rounds';
  }

  static get relationMappings() {
    return {
      movie: {
        relation: BaseModel.HasOneRelation,
        modelClass: 'Movie',
        join: {
          from: 'rounds.id',
          to: 'movies.roundId',
        },
      },
      indicatedBy: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'Member',
        join: {
          from: 'rounds.memberId',
          to: 'members.userId',
        },
      },
      watchedBy: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: 'Member',
        join: {
          from: 'rounds.id',
          through: {
            from: 'rounds_members.roundId',
            to: 'rounds_members.memberId',
          },
          to: 'members.userId',
        },
      },
    };
  }
}

module.exports = Round;
