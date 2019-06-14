const { Model } = require('objection');

class Member extends Model {
  static get tableName() {
    return 'members';
  }

  static get relationMappings() {
    return {
      indications: {
        relation: Model.HasManyRelation,
        modelClass: 'Round',
        join: {
          from: 'members.id',
          to: 'rounds.memberId',
        },
      },
    };
  }
}

module.exports = Member;
