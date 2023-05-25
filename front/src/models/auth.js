export function MakeRequestAuth(data) {
  return {
    login: data.login,
    password: data.password,
  };
}

export function MakeRequestRefresh(refreshToken) {
  return {
    refreshToken: refreshToken,
  };
}

export function MakeRequestLogout(refreshToken) {
  return {
    refreshToken: refreshToken,
  };
}

export function MakeRequestCreateUser(data) {
  return {
    ...data,
    gender: data.gender === '0' ? 'Мужской' : 'Женский',
    birthday: new Date(data.birthday).getTime(),
  };
}

export function MakeDataFromResponse(response) {
  return response;
}