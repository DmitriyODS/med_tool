const express = require('express');
const statisticsRouter = express.Router();

function statisticsByIDGetRoute(req, res) {
  res.send('get statistics');
}

statisticsRouter.get('/:id', statisticsByIDGetRoute);

module.exports = statisticsRouter;
