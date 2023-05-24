const express = require('express');
const makeRoutes = require('./routes/routes');

const rootApp = express();
makeRoutes(rootApp);

rootApp.listen(3000, () => {
  console.log('Server running ...');
});
