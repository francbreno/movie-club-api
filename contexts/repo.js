// Uses knex to create a Repository for data access
module.exports = knex => tableName => ({
  create(data) {
    return knex(tableName).insert(data);
  },
  getById(id) {
    return knex(tableName).where({ id });
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
  find(filter) {
    return knex(tableName).where(filter);
  },
  // TODO
  // preload(table) {
  //   return knex(tableName).leftJoin(table, `${tableName}.id`, `${table}.id`)
  // },
  table() {
    return knex(tableName);
  },
});
