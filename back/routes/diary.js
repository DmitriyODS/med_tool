const express = require('express');
const { AuthMiddleware } = require('./middlewares');
const {
  GetDiaryListByUserID,
  AddDiary,
  GetDiaryByID,
  UpdateDataDiary,
  DeleteDataDiary,
} = require('../controllers/diary');
const { MakeBaseErrorResponse, MakeSuccessResponse } = require('../globals/utils');
const { MakeDiaryFromJsonData } = require('../models/diary');

const diaryRouter = express.Router();

// добавляем middleware авторизации
diaryRouter.use(AuthMiddleware);

// добавляем middleware парсинга json
diaryRouter.use(express.json());

async function diaryGetHandler(req, res) {
  try {
    // TODO: не успеваю доделать
    // const sort = req.query.sort;
    // const filter = req.query.filter;
    const curUser = req.user;
    const startIndex = req.query.startIndex;
    const endIndex = req.query.endIndex;

    // обрабатывам запрос
    const result = await GetDiaryListByUserID(curUser, startIndex, endIndex);

    // отправляем данные клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeBaseErrorResponse(err.message));
  }
}

async function diaryPostHandler(req, res) {
  try {
    const diaryData = MakeDiaryFromJsonData(req.body);
    const curUser = req.user;

    // обрабатывам запрос
    const result = await AddDiary(curUser, diaryData);

    // отправляем данные клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeBaseErrorResponse(err.message));
  }
}

async function diaryByIDPutHandler(req, res) {
  try {
    const diaryData = MakeDiaryFromJsonData(req.body);
    const curUser = req.user;

    // обрабатывам запрос
    const result = await UpdateDataDiary(curUser, diaryData);

    // отправляем данные клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeBaseErrorResponse(err.message));
  }
}

async function diaryByIDGetHandler(req, res) {
  try {
    const diaryID = req.params.id;
    const curUser = req.user;

    if (!diaryID) {
      res.status(400).json(MakeBaseErrorResponse('запись не выбрана'));
    }

    // обрабатывам запрос
    const result = await GetDiaryByID(curUser, diaryID);

    // отправляем данные клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeBaseErrorResponse(err.message));
  }
}

async function diaryByIDDeleteHandler(req, res) {
  try {
    const diaryID = req.params.id;
    const curUser = req.user;

    if (!diaryID) {
      res.status(400).json(MakeBaseErrorResponse('запись не выбрана'));
    }

    // обрабатывам запрос
    const result = await DeleteDataDiary(curUser, diaryID);

    // отправляем данные клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeBaseErrorResponse(err.message));
  }
}

diaryRouter.get('/', diaryGetHandler);
diaryRouter.post('/', diaryPostHandler);

diaryRouter.get('/:id', diaryByIDGetHandler);
diaryRouter.put('/:id', diaryByIDPutHandler);
diaryRouter.delete('/:id', diaryByIDDeleteHandler);

module.exports = diaryRouter;
