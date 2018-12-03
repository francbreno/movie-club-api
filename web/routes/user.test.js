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

describe('Given I\'m on /users route', () => {
  describe('when I do POST /users with valid data', () => {
    let response;
    let count;
    beforeEach(async () => {
      console.log('locals', app.locals);
      count = (await db('users').select()).length;
      response = await request(app)
        .post('/users')
        .send(userFixtures.valid);
    });
    test('then it must register a new user, log in and return status code 200', async () => {
      const users = await db('users').select();
      expect(users).toHaveLength(count + 1);
      expect(response.body).toBeDefined();
      expect(response.statusCode).toBe(200);
    });
  });

  describe('when I do POST /users with invalid data', () => {
    let response;
    let count;
    beforeEach(async () => {
      count = (await db('users').select()).length;
      response = await request(app)
        .post('/users')
        .send(userFixtures.invalid);
    });
    test('then it must respond with status code 400, not register a new user and return the errors', async () => {
      const users = await db('users').select();
      expect(response.statusCode).toBe(400);
      expect(users).toHaveLength(count);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('when I do GET /users and there are some users registered', () => {
    let response;
    let count;
    beforeEach(async () => {
      count = (await db('users').select()).length;
      response = await request(app).get('/users');
    });
    test('then it must return all registered users', () => expect(response.body.length).toBe(count));
  });

  describe('when I do GET /users and there is no user registered', () => {
    let response;
    beforeEach(async () => {
      await db('credentials').del();
      await db('users').del();
      response = await request(app).get('/users');
    });
    test('then it must return no users', () => expect(response.body.length).toBe(0));
  });
});
