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

  placeholderSelect(sqlRow) {
    this.id = sqlRow.id;
    this.userID = sqlRow.user_id;
    this.refreshToken = sqlRow.refresh_token;
  }

  placeholderInsert() {
    return [this.userID, this.refreshToken];
  }

  placeholderUpdate(oldRefreshToken) {
    return [this.refreshToken, this.userID, oldRefreshToken];
  }
}

module.exports = Session;
