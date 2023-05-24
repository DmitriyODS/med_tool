const { ValidateJWTToken } = require('../globals/jwt');
const { ErrJWTTokenExpired, ErrJWTTokenInvalid } = require('../globals/consts');

class Session {
  constructor(id = 0, userID = 0, refreshToken = '') {
    this.id = id;
    this.userID = userID;
    this.refreshToken = refreshToken;
  }

  validate() {
    // проверим валидность токена
    if (!this.refreshToken) {
      return false;
    }

    const payload = ValidateJWTToken(this.refreshToken, process.env.JWT_REFRESH_SECRET);

    return !(payload === ErrJWTTokenExpired || payload === ErrJWTTokenInvalid);
  }
}

module.exports = Session;
