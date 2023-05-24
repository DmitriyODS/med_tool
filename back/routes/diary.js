const express = require('express');
const diaryRouter = express.Router();

function diaryGetHandler(req, res) {
  res.send('get diary');
}

function diaryPostHandler(req, res) {
  res.send('post diary');
}

function diaryByIDGetHandler(req, res) {
  res.send('ByIDGet diary');
}

function diaryByIDPutHandler(req, res) {
  res.send('ByIDPut diary');
}

function diaryByIDDeleteHandler(req, res) {
  res.send('ByIDDelete diary');
}

diaryRouter.get('/', diaryGetHandler);
diaryRouter.post('/', diaryPostHandler);

diaryRouter.get('/:id', diaryByIDGetHandler);
diaryRouter.put('/:id', diaryByIDPutHandler);
diaryRouter.delete('/:id', diaryByIDDeleteHandler);

module.exports = diaryRouter;
