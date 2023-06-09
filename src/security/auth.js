const { sign } = require('jsonwebtoken');

exports.generateAuthToken = (id, nom, isAdmin) => {
  
  const permissions = isAdmin ? ["admin"] : [];

  return sign({ id, nom, permissions }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_ON });
 
};