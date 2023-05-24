const express = require('express');
const usersRouter = express.Router();

function usersPostRoute(req, res) {
  res.send('post users');
}

function usersByIDGetRoute(req, res) {
  res.send('ByIDGet users');
}

function usersByIDPutRoute(req, res) {
  res.send('ByIDPut users');
}

function usersByIDDeleteRoute(req, res) {
  res.send('ByIDDelete users');
}

usersRouter.post('/', usersPostRoute);

usersRouter.get('/:id', usersByIDGetRoute);
usersRouter.put('/:id', usersByIDPutRoute);
usersRouter.delete('/:id', usersByIDDeleteRoute);

module.exports = usersRouter;
