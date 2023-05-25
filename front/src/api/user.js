import { ServerAPIV1 } from './methods';
import { GetJWTFromLocalStorage } from '../globals/utils';
import { MakeDataFromResponse } from '../models/auth';

export async function GetUserByID(userID) {
  if (!userID) {
    return Promise.reject('Не указан ID пользователя');
  }

  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPIV1.users}/${userID}`;

  return new Promise(async (resolve, reject) => {
    const jwtKey = GetJWTFromLocalStorage();
    if (!jwtKey) {
      reject('Вы не авторизировованы');
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          authorization: jwtKey,
        },
      });

      const result = await response.json();
      if (result.ok && !!result.data) {
        resolve(MakeDataFromResponse(result.data));
      } else {
        reject(`Ошибка: ${result.description}`);
      }
    } catch (e) {
      reject('Сервер не доступен');
    }
  });
}