const { DataTypes } = require('sequelize');
const { sequelize } = require('./sqlite.db');

const User = sequelize.define(
  'User',
  {
    id: { primaryKey: true, type: DataTypes.STRING },
    email : { type: DataTypes.STRING, allowNull: false, unique : true},
    nom: { type: DataTypes.STRING, allowNull: false },
    prenom: { type: DataTypes.STRING, allowNull: false },
    motDePasse: { type: DataTypes.STRING, allowNull: false },
    pseudo : { type: DataTypes.STRING, allowNull: false, unique : true},
    isAdmin: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  { tableName: 'user' },
);


module.exports = User;



























/*
(async () => {
    await sequelize.sync();
  
    await sequelize.query('ALTER TABLE user ADD COLUMN id_groupe STRING REFERENCES groupe(id) ;');
    
    
  })();*/