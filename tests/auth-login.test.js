/* global apiUrl */
const apiUrl = 'http://localhost:3000';
const request = require('supertest');

describe('Success login', () => {
  test('POST /auth/login', async () => {
    const res = await request(apiUrl).post('/auth/login').send({
      email: 's@gmail.com',
      motDePasse: 'motDePasse',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});

describe('Failed login', () => {
  test('POST /auth/login => without email', async () => {
    const res = await request(apiUrl).post('/auth/login').send({
      motDePasse: 'motDePasse',
    });

    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual('Property "req.body.email": Invalid value. Current value = undefined');
  });

  test('POST /auth/login => with wrong email', async () => {
    const res = await request(apiUrl).post('/auth/login').send({
      email: 'fake',
      motDePasse: 'motDePasse',
    });

    expect(res.statusCode).toEqual(401);
    expect(res.text).toEqual('Unauthorized');
  });

  test('POST /auth/login => with wrong password', async () => {
    const res = await request(apiUrl).post('/auth/login').send({
      email: 's@gmail.com',
      motDePasse: 'fake',
    });

    expect(res.statusCode).toEqual(401);
    expect(res.text).toEqual('Unauthorized');
  });
});
