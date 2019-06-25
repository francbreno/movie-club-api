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
        relation: BaseModel.HaManyRelation,
        modelClass: 'Round',
        join: {
          from: 'club.id',
          to: 'round.clubId',
        },
      },
    };
  }
}

module.exports = Club;
