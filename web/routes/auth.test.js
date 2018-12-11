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
  let response;
  beforeEach(async () => {
    console.log('clear before test');
    response = undefined;
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });

  afterEach(async () => {
    console.log('rollback after test');
    await db.migrate.rollback();
  });

  describe('when I do POST /auth and provide valid credentials', () => {
    beforeEach(async () => {
      response = await request(app)
        .post('/users')
        .send(userFixtures.valid)
        .then(() => request(app)
          .post('/auth')
          .send(userFixtures.valid.credential));

      console.log('user registered');
      console.log('login step completed');
    });
    test('then it must respond with status code 200', () => {
      console.log('testing status code');
      expect(response.statusCode).toBe(200);
    });
    // test('and return the token', () => {
    //   console.log('testing token defined');
    //   expect(response.body.token).toBeDefined();
    // });
  });

  // describe('when I do POST /auth with inexistent user email', () => {
  //   beforeEach(async () => {
  //     response = await request(app)
  //       .post('/auth')
  //       .send({
  //         ...userFixtures.valid,
  //         credential: {
  //           ...userFixtures.valid.credential,
  //           email: 'inexistent.user@invalid.com',
  //         },
  //       });
  //   });
  //   test('then it must respond with status code 401', () => {
  //     expect(response.statusCode).toBe(401);
  //   });
  //   test('and return the errors', () => {
  //     expect(response.body.errors).toBeDefined();
  //   });
  //   test('and not return the token', () => {
  //     expect(response.body.token).toBeUndefined();
  //   });
  // });

  // describe('when I do GET /auth/me providing a valid token', () => {
  //   beforeEach(async () => {
  //     const { body: { token } } = await request(app).post('/users', userFixtures.valid);
  //     response = await request(app)
  //       .set('Authentication', `Bearer ${token}`)
  //       .get('/auth/me');
  //   });
  //   test('then it must responde with status code 200', () => {
  //     expect(response.statusCode).toBe(200);
  //   });
  //   test('and return the user', () => {
  //     const { credential: { email }, userData } = userFixtures.valid;
  //     expect(response.body.user).toMatchObject({ ...userData, email });
  //   });
  // });

  // describe('when I do GET /auth/me and i don\'t provide a valid token', () => {
  //   beforeEach(async () => {
  //     response = await request(app).get('/auth/me');
  //   });
  //   test('then it must responde with status code 401', () => {
  //     expect(response.statusCode).toBe(401);
  //   });
  //   test('and return no user', () => {
  //     expect(response.body.errors).toBeDefined();
  //   });
  // });
});
