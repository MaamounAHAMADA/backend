const { DataTypes } = require('sequelize');
const { sequelize } = require('./sqlite.db');

const Affirmation = sequelize.define('Affirmation', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    
    },
    phrase: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre_vrai: {
      type: DataTypes.INTEGER
    },
    nombre_faux: {
      type: DataTypes.INTEGER
    }
  },
  { tableName: 'affirmation' },);
  
  Affirmation.sync();
  module.exports = Affirmation;


  (async () => {
    const tableName = 'affirmation'; 
  
    const query = ` PRAGMA table_info (${tableName}); `;
  
    try {
      const [results, metadata] = await sequelize.query(query);
      const fieldNames = results.map(result => result.Field);
      console.log(fieldNames);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de la requête :', error);
    }
  })();