const express = require('express');
const { AuthMiddleware } = require('./middlewares');
const { MakeSuccessResponse, MakeBaseErrorResponse } = require('../globals/utils');
const { MakeUserFromJsonData } = require('../models/user');
const { GetUserByID, UpdateDataUser, DeleteDataUser } = require('../controllers/users');

const usersRouter = express.Router();

// добавляем middleware авторизации
usersRouter.use(AuthMiddleware);

// добавляем middleware для парсинга json
usersRouter.use(express.json());

async function usersByIDGetRoute(req, res) {
  try {
    const userID = req.params.id;
    const curUser = req.user;

    if (!userID) {
      res.status(400).json(MakeBaseErrorResponse('запись не выбрана'));
    }

    // обрабатывам запрос
    const result = await GetUserByID(curUser, userID);

    // отправляем данные клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeBaseErrorResponse(err.message));
  }
}

async function usersByIDPutRoute(req, res) {
  try {
    const userData = MakeUserFromJsonData(req.body);
    const curUser = req.user;

    // обрабатывам запрос
    const result = await UpdateDataUser(curUser, userData);

    // отправляем данные клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeBaseErrorResponse(err.message));
  }
}

async function usersByIDDeleteRoute(req, res) {
  try {
    const userID = req.params.id;
    const curUser = req.user;

    if (!userID) {
      res.status(400).json(MakeBaseErrorResponse('запись не выбрана'));
    }

    // обрабатывам запрос
    const result = await DeleteDataUser(curUser, userID);

    // отправляем данные клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeBaseErrorResponse(err.message));
  }
}

usersRouter.get('/:id', usersByIDGetRoute);
usersRouter.put('/:id', usersByIDPutRoute);
usersRouter.delete('/:id', usersByIDDeleteRoute);

module.exports = usersRouter;
