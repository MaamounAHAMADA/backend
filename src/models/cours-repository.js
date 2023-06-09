const uuid = require('uuid');
const { Op } = require('sequelize');
const Groupe= require('./group.model');
const Cours = require ('./cours.models')
const A_GroupCours = require('./groupcours.model');
const A_AffirmationCours = require('./affirmationcours.model');
const Affirmation = require('./affirmation.model');

// Trouver toutes les données des tables Cours, A_GroupCours, Affirmation et A_AffirmationCours
exports.getCours = async () => await Cours.findAll();
exports.getGroupCours = async () => await A_GroupCours.findAll();
exports.getAffirmationCours = async () => await A_AffirmationCours.findAll();
exports.getAffirmation = async () => await Affirmation.findAll();


exports.getAffirmationOfCours = async (CourId) => {
  return await A_AffirmationCours.findAll({ where: {CourId } });
};
exports.getIdAffirmationToDelete = async (CourId) => {
  const affirmationIds = await A_AffirmationCours.findAll({
    attributes: ['AffirmationId'],
    where: {
      CourId
    }
  });
   console.log (affirmationIds);
   console.log ("-------------------------");
  const affirmations = await Affirmation.findAll({
    attributes: ['id'],
    where: {
      id: affirmationIds.map(item => item.AffirmationId),
      nombre_faux: {
        [Op.gt]: 0
      }
    }
  });
  const affirmationIdArray = affirmations.map(item => item.id);
  return affirmationIdArray;
};






exports.deleteAffirmations = async (affirmationIds) => {
  try {
    const deletedAffirmations = await A_Affirmation.destroy({
      where: {
        id: affirmationIds,
      },
    });
    console.log('Affirmations supprimées:', deletedAffirmations);
    // Répondre avec les affirmations supprimées ou un message de réussite
  } catch (error) {
    console.log('Erreur lors de la suppression des affirmations:', error);
    // Gérer l'erreur et renvoyer un message d'erreur approprié
  }
  deleteAffirmations(affirmationIds);
};

// Appeler la fonction deleteAffirmations avec les IDs des affirmations à supprimer



exports.getGroupeCours = async (GroupeId) => {
  return await A_GroupCours.findAll({ where: {GroupeId } });
};



// Trouver les données d'un cours avec un nom du cours 
exports.getCoursByName = async (nom_cours) => {
    return await Cours.findOne({ where: {nom_cours } });
  };

  exports.getAffirmationByPhrase = async (phrase) => {
    return await Affirmation.findOne({ where: {phrase} });
  };

  exports.getAffirmationById = async (id) => {
    return await Affirmation.findOne({ where: {id} });
  };

  exports.getAffirmationCoursById = async (phrase) => {
    return await Affirmation.findOne({ where: {phrase} });
  };


  exports.getCoursById = async (id) => {
    return await Cours.findOne({ where: {id} });
  };


  
// Créer un cours avec un id crypté en uuid
  exports.createCours = async (body) => {
    const cours = body;
    cours.id = uuid.v4();
    cours.statut = 1;
    await Cours.create(cours);
  };


// Créer une affirmation avec un id crypté en uuid
exports.createAffirmation = async (body) => {
    const affirmation = body;
    affirmation.id = uuid.v4();
    affirmation.nombre_vrai = 0;
    affirmation.nombre_faux = 0;
    await Affirmation.create(affirmation);
  };



// Créer un lien GroupCours
exports.createGroupCours = async (body) => {
  await A_GroupCours.create(body);
};

// Créer un lien GroupCours
exports.createAffimationCours = async (body) => {
    await A_AffirmationCours.create(body);
  };

 
// Ajouter un utilisateur à un groupe en rentrant l'id de l'utilisateur et l'id du groupe
exports.addCoursToGroup = async (body) =>{
try {

const data = JSON.parse(body);
const coursId = data.CourId;
const groupId = data.GroupeId;


    // Récupérer l'utilisateur et le groupe correspondants
    const cours = await Cours.findOne({ where: { id: coursId} });
    const groupe = await Groupe.findOne({ where: { id: groupId } });
    if (!cours || !groupe) {
    console.log("Cours ou groupe inexistant");
    return;
    }
    // Ajouter l'utilisateur au groupe
    await groupe.addCours(cours);
    console.log("Leçon ajouté au groupe");
} catch (err) {
    console.error(err);
}
}
  

//Ajouter une affirmation à un cours en rentrants les id respectifs
exports.addAffirmationToCours = async (body) =>{
try {

const data = JSON.parse(body);
const coursId = data.CourId;
const affirmationId = data.AffirmationId;


    // Récupérer l'affirmation et le cours correspondants
    const cours = await Cours.findOne({ where: { id: coursId} });
    const affirmation = await Affirmation.findOne({ where: { id: affirmationId } });
    if (!cours || !affirmation) {
    console.log("Cours ou groupe inexistant");
    return;
    }
    // Ajouter l'utilisateur au groupe
    await cours.addAffirmation(affirmation);
    console.log("Affirmation ajoutée au cours");
} catch (err) {
    console.error(err);
}
}
  

//Modifier un utilisateur avec son id 
exports.updateAffirmation = async (id, data) => {
    const foundAffirmation = await Affirmation.findOne({ where: { id } });
  
    if (!foundAffirmation) {
      throw new Error('Affirmation non trouvée');
    }
  
    await Affirmation.update(
      {
        phrase: data.phrase || foundAffirmation.phrase,
      },
      { where: { id } },
    );
  };



  exports.putTrueAffirmation = async (id) => {
    const foundAffirmation = await Affirmation.findOne({ where: { id } });
  
    if (!foundAffirmation) {
      throw new Error('Affirmation non trouvée');
    }
  
    await Affirmation.update(
      {
        nombre_vrai: foundAffirmation.nombre_vrai +1,
      },
      { where: { id } },
    );
  };


  exports.putFalseAffirmation = async (id) => {
    const foundAffirmation = await Affirmation.findOne({ where: { id } });
  
    if (!foundAffirmation) {
      throw new Error('Affirmation non trouvée');
    }
  
    await Affirmation.update(
      {
        nombre_faux : foundAffirmation.nombre_faux + 1,
      },
      { where: { id } },
    );
  };

  exports.updateCours = async (id, data) => {
    const foundCours = await Cours.findOne({ where: { id } });
  
    if (!foundCours) {
      throw new Error('Cours non trouvé');
    }
  
    await Cours.update(
      {
        statut: data.statut,
        nom_cours: data.nom_cours,
      },
      { where: { id } },
    );
  };



// Supprimer un groupe avec son nom
  exports.deleteCours = async (nom_cours) => {
    await Cours.destroy({ where: { nom_cours } });
  };
// Supprimer un groupe avec un id
  exports.deleteGroupCours = async (id) => {
    await A_GroupCours.destroy({ where: { id } });
  };  





// Supprimer une affirmation d'un cours avec un id
exports.deleteAffirmationCours = async (id) => {
    await A_AffirmationCours.destroy({ where: { id } });
    };  
// Supprimer une affirmation avec un id
exports.deleteAffirmation = async (id) => {
    await Affirmation.destroy({ where: { id } });
    };  