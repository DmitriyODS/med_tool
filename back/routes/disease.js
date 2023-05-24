const express = require('express');
const { AuthMiddleware } = require('./middlewares');
const { MakeSuccessResponse, MakeErrorResponse } = require('../globals/utils');
const { GetDiseaseListByUserID, AddDisease, UpdateDisease, DeleteDisease } = require('../controllers/disease');
const { MakeDiseaseFromJsonData } = require('../models/disease');

const diseaseRouter = express.Router();

// добавляем middleware авторизации
diseaseRouter.use(AuthMiddleware);

// добавляем middleware для парсинга json
diseaseRouter.use(express.json());

async function diseaseGetHandler(req, res) {
  try {
    const sort = req.query.sort;
    const filter = req.query.filter;
    const curUser = req.user;

    // обрабатывам запрос
    const result = await GetDiseaseListByUserID(curUser, sort, filter);

    // отправляем данные клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeErrorResponse(err));
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
    res.status(500).json(MakeErrorResponse(err));
  }
}

async function diseaseByIDGetHandler(req, res) {
  try {
    const diseaseID = req.params.id;
    const curUser = req.user;

    if (!diseaseID) {
      res.status(400).json(MakeErrorResponse('запись не выбрана'));
    }

    // обрабатывам запрос
    const result = await GetDiseaseListByUserID(curUser, diseaseID);

    // отправляем данные клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeErrorResponse(err));
  }
}

async function diseaseByIDPutHandler(req, res) {
  try {
    const diseaseData = MakeDiseaseFromJsonData(req.body);
    const curUser = req.user;

    // обрабатывам запрос
    const result = await UpdateDisease(curUser, diseaseData);

    // отправляем данные клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeErrorResponse(err));
  }
}

async function diseaseByIDDeleteHandler(req, res) {
  try {
    const diseaseID = req.params.id;
    const curUser = req.user;

    if (!diseaseID) {
      res.status(400).json(MakeErrorResponse('запись не выбрана'));
    }

    // обрабатывам запрос
    const result = await DeleteDisease(curUser, diseaseID);

    // отправляем данные клиенту
    res.json(MakeSuccessResponse(result));
  } catch (err) {
    res.status(500).json(MakeErrorResponse(err));
  }
}

diseaseRouter.get('/', diseaseGetHandler);
diseaseRouter.post('/', diseasePostHandler);

diseaseRouter.get('/:id', diseaseByIDGetHandler);
diseaseRouter.put('/:id', diseaseByIDPutHandler);
diseaseRouter.delete('/:id', diseaseByIDDeleteHandler);

module.exports = diseaseRouter;
