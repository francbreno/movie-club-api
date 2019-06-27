const { catchErrors } = require('../handlers/errorHandlers');

const _all = async (req, res, next) => {
  console.log('calling tmdb api...');
  const { title } = req.query;
  const { locals: { contexts } } = req.app;
  const movies = await contexts.externalMovieSearch.searchMovie(title);
  res.json(movies).status(200);
};

exports.all = catchErrors(_all);
