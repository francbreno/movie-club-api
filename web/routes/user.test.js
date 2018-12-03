const request = require('supertest');
const app = require('../app');
const db = require('../../config/db');

describe('Given I\'m on /users route', () => {
  const userFixtures = {
    valid: {
      name: 'John Doe',
      user_name: 'johnnydoe',
      credentail: {
        email: 'mrjohndoe@unknown.com',
        password: 'Abf123d',
      },
    },
    invalid: {
      name: 'John Doe',
      user_name: '',
      credentail: {
        email: 'mrjohndoe@unknown.com',
        password: 'Abf123d',
      },
    },
  };

  beforeAll(async () => {
    // create structure
  });

  beforeEach(async () => {
    db('users').del();
  });

  describe('when I POST /users', () => {
    describe('with valid data', () => {
      let response;
      beforeEach(async () => {
        response = await request(app)
          .post('/users')
          .send(userFixtures.valid);
      });

      it('must register a new user', () => expect(response.statusCode).toBe(200));
      it('and must log in', () => expect(response.body).toBeDefined());
    });
    describe('with invalid data', () => {
      let response;
      beforeEach(async () => {
        response = await request(app)
          .post('/users')
          .send(userFixtures.invalid);
      });

      it('must not register a new user', async () => {
        const users = await app.locals.contexts.accounts.allUsers();
        expect(users).toHaveLength(0);
      });
      it('and must return status 500', () => expect(response.statusCode).toBe(500));
    });
  });

  describe('when I GET /users', () => {
    describe('and there are some users registered', () => {
      let response;
      beforeEach(async () => {
        await db('users').insert({
          name: 'Fulano',
          username: 'fulaninho',
        });
        response = await request(app).get('/users');
      });
      it('must return all registered users', () => expect(response.body.length).toBe(1));
    });
    describe('and there is no user registered', () => {
      let response;
      beforeEach(async () => {
        response = await request(app).get('/users');
      });
      it('must return no users', () => expect(response.body.length).toBe(0));
    });
  });
});
