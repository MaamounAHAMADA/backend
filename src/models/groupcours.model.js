const { DataTypes } = require("sequelize");
const { sequelize } = require('./sqlite.db');

const Cours = require ('./cours.models')
const Groupe = require('./group.model');


const A_GroupCours = sequelize.define('a_groupcours', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
 
});

Cours.belongsToMany(Groupe, { through: A_GroupCours });
Groupe.belongsToMany(Cours, { through: A_GroupCours });

module.exports = A_GroupCours;
sequelize.sync();

