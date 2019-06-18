const BaseModel = require('./baseModel');

class Club extends BaseModel {
  static get tableName() {
    return 'movies';
  }

  static get relationMappings() {
    return {
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
