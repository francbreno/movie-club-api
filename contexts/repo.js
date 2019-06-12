// Uses knex to create a Repository for data access
module.exports = knex => tableName => ({
  create(data) {
    return knex(tableName).insert(data).returning('*');
  },
  getById(id) {
    return knex(tableName).where({ id }).first();
  },
  getAll() {
    return knex(tableName);
  },
  update(id, data) {
    return knex(tableName).where({ id }).update(data);
  },
  delete(id) {
    return knex(tableName).where({ id }).delete();
  },
  search(filter) {
    return knex(tableName).where(filter);
  },
});
