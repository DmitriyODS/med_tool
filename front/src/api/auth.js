import { ServerAPIV1 } from './methods';
import {
  MakeDataFromResponse,
  MakeRequestAuth,
  MakeRequestCreateUser,
  MakeRequestRefresh,
} from '../models/auth';

export async function Login(user) {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPIV1.auth}`;
  const req = MakeRequestAuth(user);

  return new Promise(async (resolve, reject) => {
    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(req),
      });

      const result = await resp.json();
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

export async function Refresh(refreshToken) {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPIV1.auth}`;
  const req = MakeRequestRefresh(refreshToken);

  return new Promise(async (resolve, reject) => {
    try {
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(req),
      });

      const result = await resp.json();
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

export async function CreateUser(user) {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPIV1.createUser}`;
  const req = MakeRequestCreateUser(user);

  return new Promise(async (resolve, reject) => {
    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(req),
      });

      const result = await resp.json();
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
