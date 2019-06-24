const BaseModel = require('./baseModel');

class Credential extends BaseModel {
  static get tableName() {
    return 'credentials';
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'User',
        join: {
          from: 'credentials.userId',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Credential;
