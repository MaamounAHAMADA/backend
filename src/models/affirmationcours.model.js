const { DataTypes } = require("sequelize");
const { sequelize } = require('./sqlite.db');

const Cours = require ('./cours.models')
const Affirmation = require('./affirmation.model');


const A_AffirmationCours = sequelize.define('a_affirmationcours', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
 
});

Cours.belongsToMany(Affirmation, { through: A_AffirmationCours });
Affirmation.belongsToMany(Cours, { through: A_AffirmationCours });

module.exports = A_AffirmationCours;
sequelize.sync();
