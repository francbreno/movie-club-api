const request = require('supertest');
const app = require('../app');
const db = require('../../config/db');

describe('/rounds', () => {
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

  describe('Feature: Show all rounds', () => {
    describe('Scenario: Not logged in', () => {
      describe('When I GET /rounds', () => {
        beforeEach(async () => {
          response = await request(app)
            .get('/rounds');
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
        describe('When I GET /rounds', () => {
          beforeEach(async () => {
            response = await request(app)
              .get('/rounds')
              .set('Authorization', `Bearer ${token}`);
          });

          test('then it must return status 200', () => {
            expect(response.statusCode).toBe(200);
          });
          test('and the list of rounds', () => {
            expect(response.body).toHaveLength(2);
          });
          test('and return no errors', () => {
            expect(response.body.errors).toBeUndefined();
          });
        });
      });
    });
  });
});
