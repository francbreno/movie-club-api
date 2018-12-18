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

  describe('findUserByToken', () => {
    let token;
    let user;
    beforeEach(async () => {
      token = await Accounts.register(userFixtures.valid);
    });

    describe('with a valid token', () => {
      beforeEach(async () => {
        user = await Accounts.findUserByToken(token);
      });
      test('It must return the user', () => {
        // console.log('user found, its defined', user);
        expect(user).toBeDefined();
      });
      test('with the right name', () => {
        expect(user.name).toBe(userFixtures.valid.name);
      });
    });
  });

  describe('loginWithEmailAndPassword', () => {
    beforeEach(async () => {
      await Accounts.register(userFixtures.valid);
    });

    describe('with valid email and password', () => {
      test('It must return a token', async () => {
        const { email, password } = userFixtures.valid.credential;
        const token = await Accounts.loginWithEmailAndPassword(email, password);
        expect(token).toBeDefined();
      });
    });

    describe('with an inexistent email', () => {
      const inexistentEmail = 'inexistent@mail.com';
      test('It must thrown an error', () => Accounts.loginWithEmailAndPassword(
        inexistentEmail,
        userFixtures.valid.credential.password,
      ).catch(e => expect(e.message).toBe(`User not found with email ${inexistentEmail}`)));
    });

    describe('with the wrong password', () => {
      const wrongPassword = 'Wr0ngPas5word';
      test('It must thrown an error', () => Accounts.loginWithEmailAndPassword(
        userFixtures.valid.credential.email,
        wrongPassword,
      ).catch(e => expect(e.message).toBe('Invalid email and/or password')));
    });
  });
});
