const { ValidateJWTToken } = require('../globals/jwt');
const { ErrJWTTokenExpired, ErrJWTTokenInvalid } = require('../globals/consts');
const { User } = require('../models/user');
const { MakeErrorResponse } = require('../globals/utils');

// Authenticated - middleware для проверки авторизации пользователя
function Authenticated(req, res, next) {
  const jwt = req.headers.authorization;
  if (!jwt) {
    res.status(401).json(MakeErrorResponse('токен не предоставлен'));
    return;
  }

  const jwtPayload = ValidateJWTToken(jwt, process.env.JWT_SECRET);
  if (jwtPayload === ErrJWTTokenExpired) {
    res.status(401).json(MakeErrorResponse('токен просрочен'));
    return;
  }

  if (jwtPayload === ErrJWTTokenInvalid) {
    res.status(401).json(MakeErrorResponse('токен недействителен'));
    return;
  }

  req.user = new User(jwtPayload.id);

  next();
}

// Logger - middleware для логирования запросов
// TODO: привести в подобающий вид, если будет нужна в дальнейшем
function Logger(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}

module.exports = {
  AuthMiddleware: Authenticated,
  LoggerMiddleware: Logger,
};
