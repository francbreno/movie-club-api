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

describe("Given I'm on /users route", () => {
  beforeEach(() => {
    console.log('BEFORE EACH - RESTART DATABASE');
    return db.migrate.rollback()
      .then(db.migrate.latest)
      .then(db.seed.run);
  });

  afterEach(() => db.migrate.rollback());

  describe('when I do POST /users with valid data', () => {
    let response;
    beforeEach(async () => {
      response = await request(app)
        .post('/users')
        .send(userFixtures.valid);
    });

    test('then it must return status 200', () => {
      expect(response.statusCode).toBe(200);
    });
    test('and login', () => {
      expect(response.body).toBeDefined();
    });
  });

  describe('when I do GET /users and there are some users registered', () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get('/users');
    });
    test('then it must have status 200', () => expect(response.statusCode).toBe(200));
    test('and return all registered users', () => expect(response.body).toHaveLength(2));
  });

  describe('when I do GET /users and there is no user registered', () => {
    let response;
    beforeEach(async () => {
      await db('credentials').del();
      await db('users').del();
      response = await request(app).get('/users');
    });
    test('then it must have status 200', () => expect(response.statusCode).toBe(200));
    test('and return no users', () => expect(response.body.length).toBe(0));
  });
});
