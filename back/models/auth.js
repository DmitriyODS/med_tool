class Auth {
  constructor(id = 0, userID = 0, refreshToken = '') {
    this.id = id;
    this.userID = userID;
    this.refreshToken = refreshToken;
  }

  validate() {
    return true;
  }
}

module.exports = Auth;
