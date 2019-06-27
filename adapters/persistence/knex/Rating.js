const BaseModel = require('./baseModel');

class Rating extends BaseModel {
  static get tableName() {
    return 'rounds';
  }
}

module.exports = Rating;
