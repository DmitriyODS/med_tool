import { ServerAPIV1 } from './methods';
import { GetJWTFromLocalStorage } from '../globals/utils';
import { MakeDataFromResponseDisease } from '../models/disease';

export async function GetDisease(startIndex, endIndex) {
  const baseServer = process.env.REACT_APP_SERVER;
  const urlParams = new URLSearchParams({
    startIndex: startIndex.toString(),
    endIndex: endIndex.toString(),
  });
  const url = `http://${baseServer}${ServerAPIV1.disease}?${urlParams}`;

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
        resolve(MakeDataFromResponseDisease(result.data));
      } else {
        reject(`Ошибка: ${result.description}`);
      }
    } catch (e) {
      reject('Сервер не доступен');
    }
  });
}

export async function GetDiseaseByID(id) {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPIV1.disease}/${id}`;

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
        resolve(MakeDataFromResponseDisease(result.data));
      } else {
        reject(`Ошибка: ${result.description}`);
      }
    } catch (e) {
      reject('Сервер не доступен');
    }
  });
}

export async function CreateDisease(disease) {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPIV1.disease}`;
  const req = disease;

  return new Promise(async (resolve, reject) => {
    const jwtKey = GetJWTFromLocalStorage();
    if (!jwtKey) {
      reject('Вы не авторизировованы');
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          authorization: jwtKey,
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(req),
      });

      const result = await response.json();
      if (result.ok && !!result.data) {
        resolve(result.data);
      } else {
        reject(`Ошибка: ${result.description}`);
      }
    } catch (e) {
      reject('Сервер не доступен');
    }
  });
}

export async function EditDisease(disease) {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPIV1.disease}/${disease.id}`;
  const req = disease;

  return new Promise(async (resolve, reject) => {
    const jwtKey = GetJWTFromLocalStorage();
    if (!jwtKey) {
      reject('Вы не авторизировованы');
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          authorization: jwtKey,
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(req),
      });

      const result = await response.json();
      if (result.ok && !!result.data) {
        resolve(result.data);
      } else {
        reject(`Ошибка: ${result.description}`);
      }
    } catch (e) {
      reject('Сервер не доступен');
    }
  });
}

export async function DeleteDisease(diseaseID) {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPIV1.disease}/${diseaseID}`;

  return new Promise(async (resolve, reject) => {
    const jwtKey = GetJWTFromLocalStorage();
    if (!jwtKey) {
      reject('Вы не авторизировованы');
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          authorization: jwtKey,
        },
      });

      const result = await response.json();
      if (result.ok && !!result.data) {
        resolve(result.data);
      } else {
        reject(`Ошибка: ${result.description}`);
      }
    } catch (e) {
      reject('Сервер не доступен');
    }
  });
}
