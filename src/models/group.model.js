const { DataTypes } = require("sequelize");
const { sequelize } = require('./sqlite.db');

const Groupe = sequelize.define('Groupe', {

  id: { primaryKey: true, type: DataTypes.STRING },
  nomGroupe: {type : DataTypes.STRING, allowNull: false, unique : true }
  },
  { tableName: 'groupe' },
  );



module.exports = Groupe;
sequelize.sync();
