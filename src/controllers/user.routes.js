const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');
const { validateBody } = require('./Validation/validation.routes');


const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const { body } = require('express-validator');
const  guard = require('express-jwt-permissions')({
  requestProperty: 'auth',
});




router.get('/', async (req, res) => {
  res.status(200).send(await userRepository.getUsers());
});





router.get('/:id', async (req, res) => {
  const found = await userRepository.getUserById(req.params.id);

  if (!found) { 
    res.status(500).send('User by id not found'); 
    return;
  }

  res.send(found);
});

router.get('/searchby/:pseudo', async (req, res) => {
  try{
  const foundi = await userRepository.getUserByPseudo(req.params.pseudo);


  if (!foundi) { 
    res.status(404).send('User by pseudo not found');
    return;
  }
  
  console.log(res)
  res.send(foundi);
}
catch(e){
console.log (e)
}
});





router.get('/:nom',  async (req, res) => {
  const foundUser = await userRepository.getUserByFirstName(req.params.nom);

  if (!foundUser) {
    res.status(500).send('User not found');
    return;
  }

  res.send(foundUser);
});








router.post(
  '/',
  body('nom').notEmpty() ,
  body('prenom').notEmpty(),
  body('pseudo').notEmpty(),
  body('email').notEmpty(),
  body('motDePasse').notEmpty().isLength({ min: 5 }),
  
  async (req, res) => {
    try {
      validateBody(req);
    } catch (e) {
     
      res.status(500).send(e.message);
      return;
    }

    await userRepository.createUser(req.body);
    res.status(201).end();
  },
);

router.put('/:id', async (req, res) => {
  await userRepository.updateUser(req.params.id, req.body).catch((err) => res.status(500).send(err.message));
  res.status(204).end();
});

/*router.delete('/:id', guard.check('admin'), async (req, res) => {
  await userRepository.deleteUser(req.params.id);
  res.status(204).end();
});*/

exports.initializeRoutes = () => router;