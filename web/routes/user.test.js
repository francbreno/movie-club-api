const request = require('supertest');
const app = require('../app');
const db = require('../../config/db');

const userFixtures = {
  valid: {
    name: 'John Doe',
    user_name: 'johnnydoe',
    credential: {
      email: 'mrjohndoe@unknown.com',
      password: 'Abf123d',
    },
  },
  invalid: {
    name: 'John Doe',
    user_name: '',
    credential: {
      email: 'mrjohndoe@unknown.com',
      password: 'Abf123d',
    },
  },
};

describe('/users route', () => {
  let response;
  beforeEach(async () => {
    await db('credentials').delete();
    await db('users').delete();
  });

  describe('when I do POST /users with valid data', () => {
    beforeEach(async () => {
      response = await request(app)
        .post('/users')
        .send(userFixtures.valid);
    });

    test('then it must return status 200', () => {
      expect(response.statusCode).toBe(200);
    });
    test('and do the login', () => {
      expect(response.body.token).toBeDefined();
    });
  });

  describe('when I do POST /users with invalid data', () => {
    beforeEach(async () => {
      response = await request(app)
        .post('/users')
        .send(userFixtures.invalid);
    });

    test('then it must return status 400', () => {
      expect(response.statusCode).toBe(400);
    });
    test('and return the error messages', () => {
      expect(response.body.errors).toBeDefined();
    });
    test('and not do the login', () => {
      expect(response.body.token).toBeUndefined();
    });
  });

  describe('when I do GET /users and there are some users registered', () => {
    beforeEach(async () => {
      response = await request(app).get('/users');
    });
    test('then it must return status 200', () => expect(response.statusCode).toBe(200));
    test('and return all registered users', () => expect(response.body).toHaveLength(2));
  });

  describe('when I do GET /users and there is no user registered', () => {
    beforeEach(async () => {
      await db('credentials').del();
      await db('users').del();
      response = await request(app).get('/users');
    });
    test('then it must have status 200', () => expect(response.statusCode).toBe(200));
    test('and return no users', () => expect(response.body.length).toBe(0));
  });
});
