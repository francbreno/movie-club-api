const db = require('../../config/db');
const repo = require('../repo')(db);
const Accounts = require('./index')(repo);
const User = require('./user')(repo);
const Credential = require('./credential')(repo);
const ValidationError = require('../../utils/ValidationError');

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


describe('Accounts Context', () => {
  beforeEach(async () => {
    await db('credentials').delete();
    await db('users').delete();
  });

  describe('register', () => {
    describe('with valid data', () => {
      beforeEach(async () => {
        await Accounts.register(userFixtures.valid);
      });

      test('It must be, in fact, registered', async () => {
        const registeredUser = await User.findByEmail(userFixtures.valid.credential.email);
        expect(registeredUser).toBeDefined();
      });
    });

    describe('with invalid data', () => {
      test('It must return an error', () => {
        expect(() => Accounts.register(userFixtures.invalid))
          .toThrow(new ValidationError(['"user_name" is not allowed to be empty,"user_name" must only contain alpha-numeric characters,"user_name" length must be at least 3 characters long'], 400));
      });
    });
  });

  describe('loginWithEmailAndPassword', () => {
    describe('with a valid credential', () => {
      let user;
      beforeEach(async () => {
        const token = await Accounts.register(userFixtures.valid);
        user = await Accounts.findUserByToken(token);
      });
      test('It must return the user', () => {
        expect(user).toBeDefined();
      });
    });
  });
});
