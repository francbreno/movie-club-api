exports.catchErrors = fn => (req, res, next) => fn(req, res, next).catch(next);

exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

exports.developmentErrors = (err, req, res, next) => {
  console.log(err);
  const errorDetails = {
    errors: err.errors || err.message,
    status: err.status,
    stack: err.stack || '',
  };
  res.status(err.status);
  res.json(errorDetails);
};

exports.productionErrors = (err, req, res, next) => {
  res.status(err.status);
  res.json({
    errors: err.errors || err.message,
  });
};
