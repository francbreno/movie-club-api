module.exports = useCases => ({ app }, res, next) => {
  app.locals.useCases = useCases;
  next();
};
