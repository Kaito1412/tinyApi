const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.Promise = global.Promise;

mongoose.connect(config.mongo).then(() => {
  app.listen(config.port, () => {
    console.log(`API started in port ${config.port}`);
  });
}).catch(err => {
  throw err;
});
