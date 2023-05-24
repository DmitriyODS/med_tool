const express = require('express');
const cors = require('cors');

const { LoggerMiddleware } = require('./middlewares');

// подгружаем обработчики для каждого маршрута
const auth = require('./auth');
const diary = require('./diary');
const disease = require('./disease');
const statistics = require('./statistics');
const users = require('./users');

// создаём конфигурацию для CORS
const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 60 * 1000,
};

// создаём обработчик для api версии 1
const apiV1Router = express.Router();

// MakeRoutes - функция настройки маршрутов для корневого приложения
function makeRoutes(rootApp) {
  // добавляем middleware обработки логирования
  rootApp.use(LoggerMiddleware);

  // добавляем middleware обработки CORS
  rootApp.use(cors(corsOptions));

  apiV1Router.use('/auth', auth);
  apiV1Router.use('/diary', diary);
  apiV1Router.use('/disease', disease);
  apiV1Router.use('/statistics', statistics);
  apiV1Router.use('/users', users);

  rootApp.use('/api/v1', apiV1Router);
}

module.exports = makeRoutes;
