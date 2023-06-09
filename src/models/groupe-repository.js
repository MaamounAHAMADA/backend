const uuid = require('uuid');

const Groupe= require('./group.model');
const User = require('./user.model');
const A_UserGroup = require('./usergroup.model');



// Trouver toutes les données des tables Group et A_Usergroup
exports.getGroup = async () => await Groupe.findAll();
exports.getUserGroup = async () => await A_UserGroup.findAll();



// Trouver les données d'un groupe avec un nom de groupe
exports.getGroupByName = async (nomGroupe) => {
    return await Groupe.findOne({ where: {nomGroupe } });
  };

  exports.getGroupById = async (id) => {
    return await Groupe.findOne({ where: {id } });
  };

  

  exports.findUserGroup = async (UserId, GroupeId) => {
    return await A_UserGroup.findOne({
      where: {
        UserId,
        GroupeId
      }
    });
  };

  exports.getUserGroups = async (UserId) => {
    return await A_UserGroup.findAll({ where: {UserId } });
  };
  exports.getUsergroups = async (GroupeId) => {
    return await A_UserGroup.findAll({ where: {GroupeId } });
  };

// Créer un groupe avec un id crypté en uuid
  exports.createGroup = async (body) => {
    const groupe = body;
    groupe.id = uuid.v4();

    await Groupe.create(groupe);
  };


// Créer un UserGroup 
exports.createUserGroup = async (body) => {
  await A_UserGroup.create(body);
};

 
// Ajouter un utilisateur à un groupe en rentrant l'id de l'utilisateur et l'id du groupe
   exports.addUserToGroup = async (body) =>{
    try {

    const data = JSON.parse(body);
    const userId = data.UserId;
    const groupId = data.GroupId;
    
    
      // Récupérer l'utilisateur et le groupe correspondants
      const user = await User.findOne({ where: { id: userId} });
      const groupe = await Groupe.findOne({ where: { id: groupId } });
      if (!user || !groupe) {
        console.log("Utilisateur ou groupe inexistant");
        return;
      }
      // Ajouter l'utilisateur au groupe
      await groupe.addUser(user);
      console.log("Utilisateur ajouté au groupe");
    } catch (err) {
      console.error(err);
    }
  }
  

// Supprimer un groupe avec son nom
  exports.deleteGroup = async (nomGroupe) => {
    await Groupe.destroy({ where: { nomGroupe } });
  };

  exports.deleteGroupid = async (id) => {
    await Groupe.destroy({ where: { id } });
  };


  // Supprimer un groupe avec un id
  exports.deleteUserGroup = async (id) => {
    await A_UserGroup.destroy({ where: { id } });
  };