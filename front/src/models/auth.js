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

export function MakeDataFromResponse(response) {
  return response;
}