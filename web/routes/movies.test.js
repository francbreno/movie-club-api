const request = require('supertest');
const app = require('../app');
const db = require('../../config/db');

describe('/movies route', () => {
  let response;
  beforeEach(async () => {
    response = undefined;
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });

  afterEach(async () => db.migrate.rollback());

  describe('when I do GET /users', () => {
    beforeEach(async () => {
      response = await request(app)
        .get('/movies');
    });

    test('it must return status 200', () => {
      expect(response.statusCode).toBe(200);
    });
  });
});
