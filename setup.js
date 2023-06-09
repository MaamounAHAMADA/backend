require('dotenv').config();
const WebServer = require('../../src/core/web-server');
const User = require('../../src/models/user.model');

module.exports = async () => {
  const webServer = new WebServer();
  webServer.start();
  global.webServer = webServer;

  await User.create({
    id: 'eb9789fd-7925-4f22-9ddd-c5c5225b69f9',
    nom: 'Lorem',
    prenom: 'Ipsum',
    email: 's@gmail.com',
    pseudo : 'blibli',
    motDePasse: 'motDePasse', // "motDePasse"
    isAdmin: true,
  });
}



