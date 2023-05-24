function Authenticated(req, res, next) {
  console.log('Authenticated');
  next();
}

function Logger(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}

module.exports = {
  AuthMiddleware: Authenticated,
  LoggerMiddleware: Logger,
};
