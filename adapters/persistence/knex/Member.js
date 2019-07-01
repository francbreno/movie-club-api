const BaseModel = require('./baseModel');

class Member extends BaseModel {
  static get tableName() {
    return 'members';
  }

  static get relationMappings() {
    return {
      indications: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'Round',
        join: {
          from: 'members.id',
          to: 'rounds.memberId',
        },
      },
      ratings: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'Rating',
        join: {
          from: 'members.id',
          to: 'ratings.memberId',
        },
      },
    };
  }
}

module.exports = Member;
