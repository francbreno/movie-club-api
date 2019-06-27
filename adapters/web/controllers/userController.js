const { catchErrors } = require('../handlers/errorHandlers');

const _all = async (req, res, next) => {
  const { locals: { contexts } } = req.app;
  const users = await contexts.accounts.allUsers();
  return res.send(users).status(200);
};

exports.all = catchErrors(_all);
