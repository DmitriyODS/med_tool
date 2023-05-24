const express = require('express');
const authRouter = express.Router();

function authPostHandler(req, res) {
  res.send('post auth');
}

function authPutHandler(req, res) {
  res.send('put auth');
}

function authDeleteHandler(req, res) {
  res.send('delete auth');
}

authRouter.post('/', authPostHandler);
authRouter.put('/', authPutHandler);
authRouter.delete('/', authDeleteHandler);

module.exports = authRouter;
