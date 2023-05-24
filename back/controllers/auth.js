async function Auth(login, password) {
  return 'auth';
}

async function Refresh(refreshToken) {
  return 'refresh';
}

async function Logout(refreshToken) {
  return 'logout';
}

module.exports = {
  Auth,
  Refresh,
  Logout,
};
