const { catchErrors } = require('../handlers/errorHandlers');

const _all = async (req, res, next) => {
  const { locals: { contexts } } = req.app;
  const users = await contexts.accounts.allUsers();
  return res.send(users).status(200);
};

exports.all = catchErrors(_all);

const _newOne = async (req, res, next) => {
  const { locals: { contexts } } = req.app;
  const token = await contexts.accounts.register(req.body);
  return res.send({ token }).status(201);
};

exports.newOne = catchErrors(_newOne);
