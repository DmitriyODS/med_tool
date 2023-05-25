import { ServerAPIV1 } from './methods';
import { GetJWTFromLocalStorage } from '../globals/utils';
import { MakeDataFromResponseDiary } from '../models/diary';

export async function GetDiary(startIndex, endIndex) {
  const baseServer = process.env.REACT_APP_SERVER;
  const urlParams = new URLSearchParams({
    startIndex: startIndex.toString(),
    endIndex: endIndex.toString(),
  });
  const url = `http://${baseServer}${ServerAPIV1.diary}?${urlParams}`;

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
        resolve(MakeDataFromResponseDiary(result.data));
      } else {
        reject(`Ошибка: ${result.description}`);
      }
    } catch (e) {
      reject('Сервер не доступен');
    }
  });
}