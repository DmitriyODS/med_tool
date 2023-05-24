const Session = require('../models/session');

async function SelectSessionByRefreshToken(refreshToken) {
  return new Session();
}

async function InsertSession(session) {
  return 1;
}

async function UpdateSession(session) {
  return 1;
}

async function DeleteSession(refreshToken) {
  return 1;
}

module.exports = {
  SelectSessionByRefreshToken,
  InsertSession,
  UpdateSession,
  DeleteSession,
};
