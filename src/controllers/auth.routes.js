const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');
const { generateAuthToken } = require('../security/auth');
const { body } = require('express-validator');
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }));

const { validateBody } = require('./Validation/validation.routes');

router.post('/login', body('email').notEmpty() , body('motDePasse').notEmpty(), async (req, res) => {
  try {
    validateBody(req);
  } catch (e) {
    res.status(500).send(e.message);
    return;
  }

  const { email, motDePasse } = req.body;

  const user = await userRepository.getUserByEmail(email);
  if (!user || !(user && motDePasse == user.motDePasse)) {
    res.status(401).send('Unauthorized');
   
    return;
  }

  else {res.status(200)}

  const token = generateAuthToken(user.id, user.nom, user.isAdmin);
  res.json({ token });

});



exports.initializeRoutes = () => router;