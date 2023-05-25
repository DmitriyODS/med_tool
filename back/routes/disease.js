const express = require('express');
const { AuthMiddleware } = require('./middlewares');
const { MakeSuccessResponse, MakeBaseErrorResponse } = require('../globals/utils');
const {
  GetDiseaseListByUserID,
  AddDisease,
  UpdateDataDisease,
  DeleteDataDisease,
  GetDiseaseByID,
} = require('../controllers/disease');
const { MakeDiseaseFromJsonData } = require('../models/disease');

const diseaseRouter = express.Router();

// добавляем middleware авторизации
diseaseRouter.use(AuthMiddleware);

// добавляем middleware для парсинга json
diseaseRouter.use(express.json());

async function diseaseGetHandler(req, res) {
  try {
    // TODO: не успеваю доделать
    // const sort = req.query.sort;
    // const filter = req.query.filter;
    const curUser = req.user;
    const startIndex = req.query.startIndex;
    const endIndex = req.query.endIndex;

    // обрабатывам запрос
    const result = await GetDiseaseListByUserID(curUser, startIndex, endIndex);

    // отправляем данные клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeBaseErrorResponse(err.message));
  }
}

async function diseasePostHandler(req, res) {
  try {
    const diseaseData = MakeDiseaseFromJsonData(req.body);
    const curUser = req.user;

    // обрабатывам запрос
    const result = await AddDisease(curUser, diseaseData);

    // отправляем данные клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeBaseErrorResponse(err.message));
  }
}

async function diseaseByIDGetHandler(req, res) {
  try {
    const diseaseID = req.params.id;
    const curUser = req.user;

    if (!diseaseID) {
      res.status(400).json(MakeBaseErrorResponse('запись не выбрана'));
    }

    // обрабатывам запрос
    const result = await GetDiseaseByID(curUser, diseaseID);

    // отправляем данные клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeBaseErrorResponse(err.message));
  }
}

async function diseaseByIDPutHandler(req, res) {
  try {
    const diseaseData = MakeDiseaseFromJsonData(req.body);
    const curUser = req.user;

    // обрабатывам запрос
    const result = await UpdateDataDisease(curUser, diseaseData);

    // отправляем данные клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeBaseErrorResponse(err.message));
  }
}

async function diseaseByIDDeleteHandler(req, res) {
  try {
    const diseaseID = req.params.id;
    const curUser = req.user;

    if (!diseaseID) {
      res.status(400).json(MakeBaseErrorResponse('запись не выбрана'));
    }

    // обрабатывам запрос
    const result = await DeleteDataDisease(curUser, diseaseID);

    // отправляем данные клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeBaseErrorResponse(err.message));
  }
}

diseaseRouter.get('/', diseaseGetHandler);
diseaseRouter.post('/', diseasePostHandler);

diseaseRouter.get('/:id', diseaseByIDGetHandler);
diseaseRouter.put('/:id', diseaseByIDPutHandler);
diseaseRouter.delete('/:id', diseaseByIDDeleteHandler);

module.exports = diseaseRouter;
