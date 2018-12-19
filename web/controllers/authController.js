const { catchErrors } = require('../handlers/errorHandlers');

const _newOne = async (req, res, next) => {
  const { locals: { contexts } } = req.app;
  const { email, password } = req.body;
  const token = await contexts.accounts.loginWithEmailAndPassword(email, password);
  res.send({ token }).status(200);
};

exports.newOne = catchErrors(_newOne);

const _show = async (req, res, next) => {
  const { locals: { contexts } } = req.app;
  const token = req.get('Authorization');
  const user = await contexts.accounts.findUserByToken(token);
  res.send(user).status(200);
};

exports.show = catchErrors(_show);
