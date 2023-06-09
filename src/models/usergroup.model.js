const { DataTypes } = require("sequelize");
const { sequelize } = require('./sqlite.db');

const User = require('./user.model');
const Groupe = require('./group.model');




const A_UserGroup = sequelize.define('a_userGroup', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
 
});

User.belongsToMany(Groupe, { through: A_UserGroup });
Groupe.belongsToMany(User, { through: A_UserGroup });


sequelize.sync();
module.exports = A_UserGroup;














sequelize.query("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'", { type: sequelize.QueryTypes.SELECT })
.then((tables) => {
  console.log("Tables:", tables.map((table) => table.name));
})
.catch((error) => {
  console.log("Une erreur s'est produite lors de la récupération des tables :", error);
});
/*
User.findAll().then((users) => {
    console.log(users);
  }).catch((error) => {
    console.log("Une erreur s'est produite lors de la récupération des données de la table :", error);
  });
*/