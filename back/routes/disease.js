const express = require('express');
const diseaseRouter = express.Router();

function diseaseGetHandler(req, res) {
  res.send('get disease');
}

function diseasePostHandler(req, res) {
  res.send('post disease');
}

function diseaseByIDGetHandler(req, res) {
  res.send('ByIDGet disease');
}

function diseaseByIDPutHandler(req, res) {
  res.send('ByIDPut disease');
}

function diseaseByIDDeleteHandler(req, res) {
  res.send('ByIDDelete disease');
}

diseaseRouter.get('/', diseaseGetHandler);
diseaseRouter.post('/', diseasePostHandler);

diseaseRouter.get('/:id', diseaseByIDGetHandler);
diseaseRouter.put('/:id', diseaseByIDPutHandler);
diseaseRouter.delete('/:id', diseaseByIDDeleteHandler);

module.exports = diseaseRouter;
