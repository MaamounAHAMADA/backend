const { DataTypes } = require('sequelize');
const { sequelize } = require('./sqlite.db');

const Cours = sequelize.define('Cours', {
    id: {type: DataTypes.STRING,primaryKey: true},
    nom_cours: {type: DataTypes.STRING,allowNull: false},
    statut: {  type: DataTypes.INTEGER, allowNull: false}
  },
  { tableName: 'cours' },);
    
module.exports = Cours;

