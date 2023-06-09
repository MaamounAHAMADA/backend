/* global apiUrl */

const apiUrl = 'http://localhost:3000';
const request = require('supertest');

describe('Test the whole scenario', () => {
  test("Let's go !", async () => {
    // User creation
    let res = await request(apiUrl).post('/users').send({
      nom: 'FnScenario',
      prenom: 'LnScenario',
      email : 's@gmail.com',
      pseudo : "PSeudo",
      motDePasse: 'LnmotDePasse',
      isAdmin: true,
    });

    expect(res.statusCode).toEqual(201);

    // Token creation
    res = await request(apiUrl).post('/auth/login').send({
      email : 's@gmail.com',
      motDePasse: 'LnmotDePasse',
    });

    expect(res.statusCode).toEqual(200);
    const jwt = res.body.token;

    // List users
    res = await request(apiUrl).get('/users').set('Authorization', `Bearer ${jwt}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);

    // Update user
    const user = res.body.find((user) => user.nom === 'FnScenario');
    const userId = user.id;
    const newprenom = 'LeNouveauPrenom';
    res = await request(apiUrl).put(`/users/${userId}`).set('Authorization', `Bearer ${jwt}`).send({
      prenom: newprenom,
    });

    expect(res.statusCode).toEqual(204);

    // Get updated user
    res = await request(apiUrl).get('/users/FnScenario').set('Authorization', `Bearer ${jwt}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.prenom).toEqual(newprenom);

    // Delete user
    res = await request(apiUrl).delete(`/users/${userId}`).set('Authorization', `Bearer ${jwt}`);

    expect(res.statusCode).toEqual(204);

    // List users
    res = await request(apiUrl).get('/users').set('Authorization', `Bearer ${jwt}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
  });
});
