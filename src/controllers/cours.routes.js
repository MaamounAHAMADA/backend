
const express = require('express');
const router = express.Router();
const coursRepository = require('../models/cours-repository');

const Affirmation = require('../models/affirmation.model');
const Cours = require('../models/cours.models');
const { validateBody } = require('./Validation/validation.routes');

router.post('/createcours',
async (req, res) => {
 try {
     validateBody(req); 
 } catch (e) {
   res.status(500).send(e.message);
     return;
 }
 await coursRepository.createCours(req.body);
 res.status(201).end();

 },
);
//70691eb5-aab3-49a0-98af-4b09a5b3d78c

//cours : 28b2805e-b66b-444f-8b4d-6febca2bc825
router.post('/createaffirmation',
async (req, res) => {
 try {
     validateBody(req); 
 } catch (e) {
   res.status(500).send(e.message);
     return;
 }
 await coursRepository.createAffirmation(req.body);
 res.status(201).end();

 },
);



router.get('/groupcours/:GroupeId', async (req, res) => {
  try {
    const groupCourss = await coursRepository.getGroupeCours(req.params.GroupeId);
    const coursIds = groupCourss.map(groupcours => groupcours.CourId);
    const courss = [];

  // Parcours des GroupIds pour récupérer les noms des courss
  for (const coursId of coursIds) {
    const cours = await Cours.findOne({
      where: { id: coursId },
    });
    if (cours) {
      courss.push(cours.nom_cours);
    }
  }
  res.json(courss);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des courss.' });
  }
});







router.get('/', async (req, res) => {
    res.status(200).send(await coursRepository.getCours());
  });

  router.get('/affirmation', async (req, res) => {
    res.status(200).send(await coursRepository.getAffirmation());
  });

  router.get('/affirmationcours', async (req, res) => {
    res.status(200).send(await coursRepository.getAffirmationCours());
  });

  router.get('/affirmation/:phrase', async (req, res) => {
    let found = await coursRepository.getAffirmationByPhrase(req.params.phrase);

    if (!found) {
      res.status(500).send('Aff. non trouvé avec phrase');
      return;
    }
    res.send(found);
    
  });


  router.get('/affirmation/searchbyid/:id', async (req, res) => {
    let found = await coursRepository.getAffirmationById(req.params.id);

    if (!found) {
      res.status(500).send('Aff. non trouvé avec id');
      return;
    }
    res.send(found);
    
  });

  router.get('/groupcours', async (req, res) => {
    res.status(200).send(await coursRepository.getGroupCours());
  });

  router.get('/groupcours/:GroupId', async (req, res) => {
    res.status(200).send(await coursRepository.getGroupCours());
  });


  router.get('/:id', async (req, res) => {
    let found = await coursRepository.getCoursById(req.params.id);

  if (!found) {
    res.status(500).send('Cours non trouvé avec id');
    return;
  }
  res.send(found);
  })



  router.get('/affirmationcours/:CourId', async (req, res) => {
    try {
      const affirmationcours = await coursRepository.getAffirmationOfCours(req.params.CourId);
      const AffirmationIds = affirmationcours.map(affirmationcour => affirmationcour.AffirmationId);
      const affirmations = [];

    // Parcours des GroupIds pour récupérer les noms des groupes
    for (const affirmationId of AffirmationIds) {
      const affirmation = await Affirmation.findOne({
        where: { id: affirmationId },
      });
      if (affirmation) {
        affirmations.push(affirmation.phrase);
      }
    }
    res.json(affirmations);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des groupes.' });
    }
  });


  router.get('/affirmationsToDelete/:CourId', async (req, res) => {
    try {
      const affirmationsId = await coursRepository.getIdAffirmationToDelete(req.params.CourId)
      res.send({ affirmationsId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des IDs des affirmations' });
    }
  });


 router.delete('/affirmations/:CourId', async (req, res) => {
  try {
    const affirmationIdArray = await coursRepository.getIdAffirmationToDelete(req.params.CourId)
     //affirmationIdArray = req.params.id.split(','); // Récupérer les IDs des affirmations depuis les paramètres de l'URL

     affirmationIdArray.forEach(async (affirmationId) => {
      await Affirmation.destroy({ where: { id: affirmationId } }); // Supprimer l'affirmation avec l'ID correspondant
    });

    res.status(204).json({ message: 'Affirmations supprimées avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression des affirmations :', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression des affirmations' });
  }
  });
  




  router.get('/', async (req, res) => {
    res.status(200).send(await groupRepository.getGroup());
  });



router.get('/search/:nom_cours', async (req, res) => {
    let foundGroup = await coursRepository.getCoursByName(req.params.nom_cours);

  if (!foundGroup) {
    res.status(500).send('Cours non trouvé avec nom');
    return;
  }
  res.send(foundGroup);
  })

  router.post('/groupcours', async (req, res) => {
  
    try {
      validateBody(req); 
      const jsonData = JSON.stringify(req.body); 
      await coursRepository.addCoursToGroup(jsonData);
      res.status(201).end();
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  router.post('/affirmationcours', async (req, res) => {
  
    try {
      validateBody(req); 
      const jsonData = JSON.stringify(req.body); 
      await coursRepository.addAffirmationToCours(jsonData);
      res.status(201).end();
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
  

  router.put('/affirmation/:id', async (req, res) => {
    await coursRepository.updateAffirmation(req.params.id, req.body).catch((err) => res.status(500).send(err.message));
    res.status(204).end();
  });


  router.put('/affirmation/puttrue/:id', async (req, res) => {
    await coursRepository.putTrueAffirmation(req.params.id).catch((err) => res.status(500).send(err.message));
    res.status(204).end();
  });

  router.put('/affirmation/putfalse/:id', async (req, res) => {
    await coursRepository.putFalseAffirmation(req.params.id).catch((err) => res.status(500).send(err.message));
    res.status(204).end();
  });

  router.put('/update/:id', async (req, res) => {
    await coursRepository.updateCours(req.params.id, req.body).catch((err) => res.status(500).send(err.message));
    res.status(204).end();
  });
  
  
  router.delete('/groupcours/:id', async (req, res) => {
    await coursRepository.deleteGroupCours(req.params.id);
    res.status(204).end();
  });


  router.delete('/:nom_cours', async (req, res) => {
    await coursRepository.deleteCours(req.params.nom_cours);
    res.status(204).end();
  });


  router.delete('/affirmation/:id', async (req, res) => {
    await coursRepository.deleteAffirmation(req.params.id);
    res.status(204).end();
  });


  router.delete('/affirmationcours/:id', async (req, res) => {
    await coursRepository.deleteAffirmationCours(req.params.id);
    res.status(204).end();
  });


  exports.initializeRoutes = () => router;