import { AccessTokenKey, RefreshTokenKey } from './consts';
import { Refresh } from '../api/auth';

export async function Authentication() {
  // пытаемся получить refresh-токен из localStorage
  const refreshToken = localStorage.getItem(RefreshTokenKey);
  if (!refreshToken) {
    throw new Error('пользователь не авторизирован');
  }

  // получили, пытаемся запросить и вернуть access-токен
  return await Refresh(refreshToken);
}

export function GetJWTFromLocalStorage() {
  return localStorage.getItem(AccessTokenKey);
}
