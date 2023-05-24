const express = require('express');
const { AuthMiddleware } = require('./middlewares');
const { MakeSuccessResponse, MakeBaseErrorResponse } = require('../globals/utils');
const { GetStatisticsByUserID } = require('../controllers/statistics');

const statisticsRouter = express.Router();

// добавляем middleware авторизации
statisticsRouter.use(AuthMiddleware);

async function statisticsByIDGetRoute(req, res) {
  try {
    const curUser = req.user;

    // обрабатывам запрос
    const result = await GetStatisticsByUserID(curUser);

    // отправляем данные клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeBaseErrorResponse(err.message));
  }
}

statisticsRouter.get('/', statisticsByIDGetRoute);

module.exports = statisticsRouter;
