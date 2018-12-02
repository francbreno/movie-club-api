const { catchErrors } = require('../handlers/errorHandlers');

const _all = async (req, res) => {
  const { locals: { contexts } } = req.app;
  const users = await contexts.accounts.allUsers();
  res.send(users).status(200);
};

exports.all = catchErrors(_all);

const _newOne = async (req, res) => {
  const { locals: { contexts } } = req.app;
  const user = await contexts.accounts.register(req.body);
  res.send(user).status(201);
};

exports.newOne = catchErrors(_newOne);
