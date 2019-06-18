const BaseModel = require('./baseModel');BaseModel

class Rating extends BaseModel {
  static get tableName() {
    return 'rounds';
  }
}

module.exports = Rating;
