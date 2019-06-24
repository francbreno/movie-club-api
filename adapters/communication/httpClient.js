const got = require('got');

async function get(url) {
  return got(url);
}

module.exports = {
  get,
};
