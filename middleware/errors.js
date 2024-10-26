function errorHandler(req, res, next) {
  res.locals.errors = [];
  next();
}

module.exports = errorHandler;