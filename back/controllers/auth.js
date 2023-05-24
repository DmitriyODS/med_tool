const { SelectUserByLoginPass } = require('../store/users');
const {
  MakePayloadJWT,
  GenerateJWTAccessToken,
  GenerateJWTRefreshToken,
} = require('../globals/jwt');
const {
  SelectSessionByRefreshToken,
  InsertSession,
  UpdateSession,
  DeleteSession,
} = require('../store/auth');
const { User } = require('../models/user');
const Session = require('../models/session');

async function Auth(login, password) {
  // проверяем, что к нам пришло что - то не пустое
  if (!login || !password) {
    throw new Error('логин, или пароль не могут быть пустыми');
  }

  // пытаемся получить пользователя из базы данных
  const user = await SelectUserByLoginPass(login, password);
  if (user.id === 0) {
    throw new Error('по данным логину и паролю пользователь не найден');
  }

  // если пользователь найден, то генерируем токены
  const payload = MakePayloadJWT(user);
  const accessToken = GenerateJWTAccessToken(payload);
  const refreshToken = GenerateJWTRefreshToken(payload);

  // создаём новую сессию и записываем в БД
  const session = new Session(0, user.id, refreshToken);
  const sessionID = await InsertSession(session);
  if (sessionID === 0) {
    throw new Error('ошибка создания сессии');
  }

  return {
    accessToken,
    refreshToken,
  };
}

async function Refresh(refreshToken) {
  // проверяем, что к нам пришло что - то не пустое
  if (!refreshToken) {
    throw new Error('токен не предоставлен');
  }

  // пытаемся получить сессию из базы данных
  const session = await SelectSessionByRefreshToken(refreshToken);
  if (session.id === 0) {
    throw new Error('сессия не найдена');
  }

  // проверяем валидность сессии
  if (!session.validate()) {
    throw new Error('сессия устарела');
  }

  // если сессия найдена, то генерируем новые токены
  const payload = MakePayloadJWT(new User(session.userID));
  const accessToken = GenerateJWTAccessToken(payload);
  const newRefreshToken = GenerateJWTRefreshToken(payload);

  // обвноляем сессию в БД
  session.refreshToken = newRefreshToken;
  const sessionID = await UpdateSession(session);
  if (sessionID === 0) {
    throw new Error('ошибка обновления сессии');
  }

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
}

async function Logout(refreshToken) {
  // проверяем, что к нам пришло что - то не пустое
  if (!refreshToken) {
    throw new Error('токен не предоставлен');
  }

  // сразу пытаемся удалить сессию из БД
  const sessionID = await DeleteSession(refreshToken);
  if (sessionID === 0) {
    throw new Error('сессия не найдена');
  }
}

module.exports = {
  Auth,
  Refresh,
  Logout,
};
