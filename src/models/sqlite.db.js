const { Sequelize } = require('sequelize');

exports.sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.NODE_ENV !== 'test' ? 'database.sqlite' : 'test_database.sqlite',
});