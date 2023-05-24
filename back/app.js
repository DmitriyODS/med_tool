require('dotenv').config();

const express = require('express');
const makeRoutes = require('./routes/routes');

const rootApp = express();
makeRoutes(rootApp);

const server = rootApp.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT} ...`);
});

// обработаем сигнал завершения работы приложения
process.on('SIGINT', () => {
  console.log('Server shutting down ...');
  server.close(() => {
    console.log('Server is down');
  });
  process.exit();
});

// обработаем сигнал остановки приложения
process.on('SIGTERM', () => {
  console.log('Server shutting down ...');
  server.close(() => {
    console.log('Server is down');
  });
  process.exit();
});
