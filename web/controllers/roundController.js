const { catchErrors } = require('../handlers/errorHandlers');

const _all = async (req, res, next) => {
  const { locals: { contexts } } = req.app;
  const rounds = await contexts.club.allRounds();
  return res.send(rounds).status(200);
};

exports.all = catchErrors(_all);