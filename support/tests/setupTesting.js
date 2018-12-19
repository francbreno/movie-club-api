const jwt = require('jsonwebtoken');

global.generateToken = payload => jwt.sign(payload, process.env.SECRET_KEY);
