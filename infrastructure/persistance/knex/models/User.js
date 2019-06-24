const BaseModel = require('./baseModel');

class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      credentials: {
        relation: BaseModel.HasOneRelation,
        modelClass: 'Credential',
        join: {
          from: 'users.id',
          to: 'credentials.userId',
        },
      },
    };
  }
}

module.exports = User;
