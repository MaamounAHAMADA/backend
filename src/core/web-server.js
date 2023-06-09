const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');

const userRoutes = require('../controllers/user.routes');
const authRoutes = require('../controllers/auth.routes');
const groupRoutes = require('../controllers/group.routes');
const coursRoutes = require('../controllers/cours.routes');



const { sequelize } = require('../models/sqlite.db');

class WebServer {
  app = undefined;
  port = 3000;
  server = undefined;

  constructor() {
    this.app = express();
    sequelize.sync();

    initializeConfigMiddlewares(this.app);
    this._initializeRoutes();
    initializeErrorMiddlwares(this.app);
  }

  start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }

  stop() {
    this.server.close();
  }

  _initializeRoutes() {
    this.app.use('/users', userRoutes.initializeRoutes());
    this.app.use('/auth', authRoutes.initializeRoutes());
    this.app.use('/group', groupRoutes.initializeRoutes());
    this.app.use('/cours', coursRoutes.initializeRoutes());


 
  }
}

module.exports = WebServer;