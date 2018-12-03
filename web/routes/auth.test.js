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

describe('Given I\'m on /auth route', () => {
  describe('when I do GET /auth/me and i provide a valid token', () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get('/auth/me');
    });
    test('then it must responde with status code 200 and return the user', () => {
      expect(response.statusCode).toBe(200);
    });
  });

  describe('when I do GET /auth/me and i don\'t provide a valid token', () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get('/auth/me');
    });
    test('then it must responde with status code 401 and return no user', () => {
      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({ errors: 'Unauthorized' });
    });
  });
});
