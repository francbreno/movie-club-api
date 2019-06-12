const jwt = require('jsonwebtoken');

const generateToken = (payload, secret) => {
  const tokenConfig = {
    expiresIn: '1 week',
  };
  return jwt.sign(payload, secret, tokenConfig);
};

const verifyToken = token => jwt.verify(token, process.env.SECRET_KEY);

module.exports = {
  generateToken,
  verifyToken,
};
