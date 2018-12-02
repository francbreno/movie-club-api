module.exports = contexts => ({ app }, res, next) => {
  app.locals.contexts = contexts;
  next();
};
