/* global apiUrl */
const apiUrl = 'http://localhost:3000';
const request = require('supertest');
const User = require('../src/models/user.model');

describe('Test user creation', () => {
  test('POST /users => success', async () => {
    const res = await request(apiUrl).post('/users').send({
      nom: 'Blablabla',
      prenom: 'Blublublu',
      email : 'Blolo@b.com',
      motDePasse: 'Blobloblo',
      pseudo: 'Blibli',
      isAdmin: false,
    });

    expect(res.statusCode).toEqual(201);

    await User.destroy({ where: { nom: 'Blablabla', prenom: 'Blublublu' } });
  });

  test('POST /users => without "prenom" should fail', async () => {
    const res = await request(apiUrl).post('/users').send({
      nom: 'Blablabla',
      motDePasse: 'Blobloblo',
      email : 'Blolo@b.com',
      pseudo : 'blibli',
      isAdmin: false,
    });

    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual('Property "req.body.prenom": Invalid value. Current value = undefined');
  });

  test('POST /users => with short "motDePasse" should fail', async () => {
    const res = await request(apiUrl).post('/users').send({
      nom: 'Blablabla',
      prenom: 'Blublublu',
      email : 'Blolo@b.com',
      motDePasse: 'oups',
      isAdmin: false,
    });

    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual('Property "req.body.motDePasse": Invalid value. Current value = oups');
  });
});
