const db = require('../../config/db');

module.exports = async () => {
  await db.migrate.rollback();
};
