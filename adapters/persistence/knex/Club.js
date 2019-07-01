const BaseModel = require('./baseModel');

class Club extends BaseModel {
  static get tableName() {
    return 'clubs';
  }

  static get relationMappings() {
    return {
      founder: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'User',
        join: {
          from: 'clubs.userId',
          to: 'users.id',
        },
      },
      rounds: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'Round',
        join: {
          from: 'clubs.id',
          to: 'rounds.clubId',
        },
      },
    };
  }
}

module.exports = Club;
