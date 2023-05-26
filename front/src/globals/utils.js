import { AccessTokenKey, RefreshTokenKey } from './consts';
import { Refresh } from '../api/auth';
import dayjs from 'dayjs';

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

export function GetDayjsFromUnix(date) {
  if (date === 0) {
    return null;
  }

  return dayjs.unix(date);
}

export function GetUnixFromDayjs(date) {
  if (date === null) {
    return 0;
  }

  return date.unix();
}
