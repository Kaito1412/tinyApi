const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect(config.mongo, (err, res) => {
  if (err) throw err;
  app.listen(config.port, () => {
    console.log(`API started in port ${config.port}`);
  });
});
