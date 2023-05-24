const express = require('express');
const { Auth, Refresh, Logout } = require('../controllers/auth');
const { MakeSuccessResponse, MakeBaseErrorResponse } = require('../globals/utils');

const authRouter = express.Router();
authRouter.use(express.json());

async function authPostHandler(req, res) {
  try {
    const { login, password } = req.body;

    // проверяем, что в запросе есть логин и пароль
    if (!login || !password) {
      res.status(400).json(MakeBaseErrorResponse('не указан логин или пароль'));
      return;
    }

    // пытаемся войти и получить token
    const result = await Auth(login, password);

    // отправляем token клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeBaseErrorResponse(err.message));
  }
}

async function authPutHandler(req, res) {
  try {
    const { refreshToken } = req.body;

    // проверяем, что в запросе есть token
    if (!refreshToken) {
      res.status(400).json(MakeBaseErrorResponse('не удалось продлить доступ'));
      return;
    }

    // пытаемся перевыпустить token
    const result = await Refresh(refreshToken);

    // отправляем token клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeBaseErrorResponse(err.message));
  }
}

async function authDeleteHandler(req, res) {
  try {
    const { refreshToken } = req.body;

    // проверяем, что в запросе есть token
    if (!refreshToken) {
      res.status(400).json(MakeBaseErrorResponse('не удалось выйти'));
      return;
    }

    // пытаемся выйти
    const result = await Logout(refreshToken);

    // говорим клиенту, что вышли
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeBaseErrorResponse(err.message));
  }
}

authRouter.post('/', authPostHandler);
authRouter.put('/', authPutHandler);
authRouter.delete('/', authDeleteHandler);

module.exports = authRouter;
