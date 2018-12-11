const tmdb = require('../../apis/tmdb');
const { catchErrors } = require('../handlers/errorHandlers');

const _all = async (req, res, next) => {
  console.log('calling tmsb api...');
  const { title } = req.query;
  const movies = await tmdb.searchMovie(title);
  res.json(movies).status(200);
};

exports.all = catchErrors(_all);
