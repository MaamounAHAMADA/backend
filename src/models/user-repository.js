const uuid = require('uuid');
const User = require('./user.model');


//Afficher les données de tous les utilisateurs de la tables user
exports.getUsers = async () => await User.findAll();



//Truover les données d'un user avec son nom,pseudo ou email
exports.getUserByFirstName = async (nom) => {
  return await User.findOne({ where: {nom } });
};
exports.getUserById = async (id) => {
  return await User.findOne({ where: {id} });
};

exports.getUserByPseudo = async (pseudo) => {
  return await User.findOne({ where: {pseudo} });
};

exports.getUserByEmail = async (email) => {
  return await User.findOne({ where: {email } });
};

//Créer un utilisateur avec un id crypté
exports.createUser = async (body) => {
  const user = body;
  user.id = uuid.v4();
  user.isAdmin = true;
  await User.create(user);
};


//Modifier un utilisateur avec son id 
exports.updateUser = async (id, data) => {
  const foundUser = await User.findOne({ where: { id } });

  if (!foundUser) {
    throw new Error('User not found');
  }

  await User.update(
    {
      nom: data.nom|| foundUser.nom,
      prenom: data.prenom || foundUser.prenom,
      motDePasse: data.motDePasse || foundUser.motDePasse,
    },
    { where: { id } },
  );
};


//Supprimer un utilisateur avec un id 
exports.deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};