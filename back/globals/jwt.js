const jwt = require('jsonwebtoken');
const { ErrJWTTokenExpired, ErrJWTTokenInvalid } = require('./consts');

function GenerateJWTAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

function GenerateJWTRefreshToken(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
}

function ValidateJWTToken(token, secret) {
  try {
    // пытаемся раскодировать токен
    const decoded = jwt.verify(token, secret, {
      algorithms: ['HS256'],
      ignoreExpiration: false,
    });

    // если раскодировали, проверяем время жизни токена
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      return ErrJWTTokenExpired;
    }

    return decoded;
  } catch (err) {
    console.log('JWT token invalid');
    return ErrJWTTokenInvalid;
  }
}

function MakePayloadJWT(user) {
  return {
    id: user.id,
  };
}

module.exports = {
  GenerateJWTAccessToken,
  ValidateJWTToken,
  MakePayloadJWT,
  GenerateJWTRefreshToken,
};
