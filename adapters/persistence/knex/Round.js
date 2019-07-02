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
          to: 'movies.id',
        },
      },
      indicatedBy: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'Member',
        join: {
          from: 'rounds.memberId',
          to: 'members.id',
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
          to: 'members.id',
        },
      },
    };
  }
}

module.exports = Round;
