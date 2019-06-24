const knex = require('knex');

module.exports = Model => ({
  findById: async id => Model.query().findById(id),
  findAll: async () => Model.query(),
  save: async data => Model.insert(data),
  update: async updatedData => Model.query().patch(updatedData),
  delete: async id => Model.query().deleteById(id),
});
