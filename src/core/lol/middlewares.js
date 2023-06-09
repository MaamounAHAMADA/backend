const express = require('express');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

exports.initializeImagesMiddleware = (app) => {
  app.use('/assets', express.static(`${appDir}/assets/lol/images`));
};
