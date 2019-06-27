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

describe('/users', () => {
  let token;
  let response;
  beforeEach(async () => {
    await db('credentials').delete();
    await db('users').delete();
    await db.seed.run();

    const authResponse = await request(app)
      .post('/auth')
      .send({ email: 'milton.john@gmail.com', password: 'p@radi5eL0st' });
    // eslint-disable-next-line prefer-destructuring
    token = authResponse.body.token;
  });

  describe('Feature: Show all users', () => {
    describe('Scenario: Not logged in', () => {
      describe('When I GET /users', () => {
        beforeEach(async () => {
          response = await request(app)
            .get('/users');
        });

        test('then it must return status "Unauthorized"', () => {
          expect(response.statusCode).toBe(401);
        });
        test('with no content', () => {
          expect(response.body).toEqual({});
        });
      });
    });

    describe('Scenario: Logged in', () => {
      describe('Given that I\'m logged in', () => {
        describe('When I GET /users', () => {
          beforeEach(async () => {
            response = await request(app)
              .get('/users')
              .set('Authorization', `Bearer ${token}`);
          });

          test('then it must return status 200', () => {
            expect(response.statusCode).toBe(200);
          });
          test('and the list of users', () => {
            expect(response.body).toHaveLength(2);
          });
          test('and return no errors', () => {
            expect(response.body.errors).toBeUndefined();
          });
        });
      });
    });
  });

  // describe('and I want to register a new user', () => {
  //   describe('with valid data', () => {
  //     beforeEach(async () => {
  //       response = await request(app)
  //         .post('/users')
  //         .send(userFixtures.valid);
  //     });

  //     test('then it must return status 200', () => {
  //       expect(response.statusCode).toBe(200);
  //     });
  //     test('and do the login', () => {
  //       expect(response.body.token).toBeDefined();
  //     });
  //   });

  //   describe('when I do POST /users with invalid data', () => {
  //     beforeEach(async () => {
  //       response = await request(app)
  //         .post('/users')
  //         .send(userFixtures.invalid);
  //     });
  
  //     test('then it must return status 400', () => {
  //       expect(response.statusCode).toBe(400);
  //     });
  //     test('and return the error messages', () => {
  //       expect(response.body.errors).toBeDefined();
  //     });
  //     test('and not do the login', () => {
  //       expect(response.body.token).toBeUndefined();
  //     });
  //   });
  // });

  // describe('when I do GET /users and there are some users registered', () => {
  //   beforeEach(async () => {
  //     response = await request(app).get('/users');
  //   });
  //   test('then it must return status 200', () => expect(response.statusCode).toBe(200));
  //   test('and return all registered users', () => expect(response.body).toHaveLength(2));
  // });

  // describe('when I do GET /users and there is no user registered', () => {
  //   beforeEach(async () => {
  //     await db('credentials').del();
  //     await db('users').del();
  //     response = await request(app).get('/users');
  //   });
  //   test('then it must have status 200', () => expect(response.statusCode).toBe(200));
  //   test('and return no users', () => expect(response.body.length).toBe(0));
  // });
});
