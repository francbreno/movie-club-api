const { catchErrors } = require('../handlers/errorHandlers');

const _newOne = async (req, res) => {
  const { locals: { contexts } } = req.app;
  const { email, password } = req.body;
  const token = await contexts.accounts.loginWithEmailAndPassword(email, password);
  res.send(token).status(200);
};

exports.newOne = catchErrors(_newOne);
