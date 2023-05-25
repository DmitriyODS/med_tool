const Session = require('../models/session');
const { db } = require('./store');

const sqlSelectSessionByRefreshToken = `
SELECT id,
       user_id,
       refresh_token
FROM user_data.sessions
WHERE refresh_token = $1;
`;

const sqlInsertSession = `
INSERT INTO user_data.sessions(user_id, refresh_token)
VALUES ($1, $2)
RETURNING id;
`;

const sqlUpdateSession = `
UPDATE user_data.sessions
SET refresh_token = $1
WHERE user_id = $2 AND refresh_token = $3
RETURNING id;
`;

const sqlDeleteSession = `
DELETE
from user_data.sessions
WHERE refresh_token = $1;
`;

async function SelectSessionByRefreshToken(refreshToken) {
  const session = new Session();

  try {
    const sessionData = await db.one(sqlSelectSessionByRefreshToken, [refreshToken]);
    session.placeholderSelect(sessionData);
  } catch (err) {
    console.log('SelectSessionByRefreshToken', err.message);
  }

  return session;
}

async function InsertSession(session) {
  try {
    return await db.one(sqlInsertSession, session.placeholderInsert());
  } catch (err) {
    return 0;
  }
}

async function UpdateSession(session, oldRefreshToken) {
  try {
    return await db.one(sqlUpdateSession, session.placeholderUpdate(oldRefreshToken));
  } catch (err) {
    return 0;
  }
}

async function DeleteSession(refreshToken) {
  try {
    const result = await db.result(sqlDeleteSession, [refreshToken]);
    return result.rowCount;
  } catch (err) {
    return 0;
  }
}

module.exports = {
  SelectSessionByRefreshToken,
  InsertSession,
  UpdateSession,
  DeleteSession,
};
