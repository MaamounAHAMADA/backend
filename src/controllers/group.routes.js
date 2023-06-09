
const express = require('express');
const router = express.Router();
const groupRepository = require('../models/groupe-repository');
const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const { body } = require('express-validator');
const { validateBody } = require('./Validation/validation.routes');
const Groupe = require('../models/group.model');
const User = require('../models/user.model');
const A_UserGroup = require('../models/usergroup.model');


router.post('/usergroup', async (req, res) => {
  
  try {
    validateBody(req); 
    const jsonData = JSON.stringify(req.body); 
    await groupRepository.addUserToGroup(jsonData);
    res.status(201).send({"try":"success"});
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});





  router.post('/create',body('nomGroupe').notEmpty(),
   async (req, res) => {
    try {
        validateBody(req); 
    } catch (e) {
      res.status(500).send(e.message);
      console.log("Validate Error");
      console.log(e)
        return;
    }
    try {
    await groupRepository.createGroup(req.body);
    res.status(201).send({"try":"success"});}
    catch (e) {
      res.status(500).send(e.message);
      console.log("Create Error");
        return;
    }

    },
  );



//Récupérer tous les noms des groupes auquels appartient un User

  router.get('/usergroup/:UserId', async (req, res) => {
    try {
      const userGroups = await groupRepository.getUserGroups(req.params.UserId);
      const groupeIds = userGroups.map(usergroup => usergroup.GroupeId);
      const groupes = [];

    // Parcours des GroupIds pour récupérer les noms des groupes
    for (const groupId of groupeIds) {
      const groupe = await Groupe.findOne({
        where: { id: groupId },
      });
      if (groupe) {
        groupes.push(groupe.nomGroupe);
      }
    }
    res.json(groupes);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des groupes.' });
    }
  });


  router.get('/usergroup/bygroup/:GroupeId', async (req, res) => {
    try {
      const userGroups = await groupRepository.getUsergroups(req.params.GroupeId);
      const userIds = userGroups.map(usergroup => usergroup.UserId);
      const users = [];

    // Parcours des GroupIds pour récupérer les noms des groupes
    for (const userId of userIds) {
      const user = await User.findOne({
        where: { id: userId },
      });
      if (user) {
        users.push(user.pseudo);
      }
    }
    res.json(users);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des groupes.' });
    }
  });





  router.get('/', async (req, res) => {
    res.status(200).send(await groupRepository.getGroup());
  });


  router.get('/usergroup', async (req, res) => {
    try {
      const userGroups = await groupRepository.getUserGroup();
      res.json(userGroups);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  router.get('/oneusergroup/:UserId/:GroupeId', async (req, res) => {
    try {
      const { UserId, GroupeId } = req.params;
      const userGroups = await groupRepository.findUserGroup(UserId, GroupeId);
      if (!userGroups) { 
        res.status(404).send('Usergroup not found');
        return;
      }
      res.send(userGroups);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
  


  
  );



  router.get('/:nomGroupe', async (req, res) => {
    const foundGroup = await groupRepository.getGroupByName(req.params.nomGroupe);

  if (!foundGroup) {
    res.status(500).send('Groupe non trouvé');
    return;
  }

  res.send(foundGroup);
  });


  router.delete('/:nomGroupe', async (req, res) => {
    await groupRepository.deleteGroup(req.params.nomGroupe);
    res.status(204).send('Groupe supprimé');

  });
  

  router.delete('/usergroup/:id', async (req, res) => {
    await groupRepository.deleteUserGroup(req.params.id);
    res.status(204).end();
  });

  exports.initializeRoutes = () => router;

















































