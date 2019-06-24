const jwt = require('jsonwebtoken');

const generate = (payload, secret) => {
  const tokenConfig = {
    expiresIn: '1 week',
  };
  return jwt.sign(payload, secret, tokenConfig);
};

const verify = token => jwt.verify(token, process.env.SECRET_KEY);

module.exports = {
  generate,
  verify,
};
