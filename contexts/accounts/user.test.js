const db = require('../../config/db');
const repo = require('../repo')(db);
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
    user_name: null,
    credential: {
      email: 'mrjohndoe@unknown.com',
      password: 'Abf123d',
    },
  },
};

describe('Accounts Context - User', () => {
  beforeEach(async () => {
    await db('credentials').delete();
    await db('users').delete();
  });

  describe('register', () => {
    describe('with valid data', () => {
      let userReturned;
      beforeEach(async () => {
        userReturned = await User.register(userFixtures.valid);
      });

      test('it must be persisted', async () => {
        const user = await User.getById(userReturned.id);
        expect(user).toBeDefined();
      });
      test('and must be returned', async () => {
        expect(userReturned).toBeDefined();
      });
      test('with his id defined', async () => {
        expect(userReturned.id).toBeDefined();
      });
    });

    describe('with invalid data', () => {
      test('it throws an error', async () => {
        await expect(User.register(userFixtures.invalid)).rejects.toBeTruthy();
      });
    });
  });

  describe('findByEmail', () => {
    let user;
    beforeEach(async () => {
      const createdUser = await User.register(userFixtures.valid);
      await Credential.create({
        ...createdUser,
        credential: { ...createdUser.credential, user_id: createdUser.id },
      });
    });

    describe('with a valid email from an existing user', () => {
      beforeEach(async () => {
        user = await User.findByEmail(userFixtures.valid.credential.email);
      });

      test('it must be returned', () => {
        expect(user).toBeDefined();
      });
      test('and must have the same email', () => {
        expect(user.credential.email).toBe(userFixtures.valid.credential.email);
      });
    });

    describe('with a valid email from an inexistent user', () => {
      test('it must thrown an error', () => {
        const email = 'inexistent@mail.com';
        return User.findByEmail(email)
          .catch(e => expect(e.message).toBe(`User not found with email ${email}`));
      });
    });

    describe('with an invalid email', () => {
      test('it must thrown an error', () => {
        const email = 'ineXisten4Mail.com';
        return User.findByEmail(email)
          .catch(e => expect(e.message).toBe(`User not found with email ${email}`));
      });
    });
  });

  describe('validateForRegistration', () => {
    const validateField = (user, errorMessage) => {
      test('it must throw an error', () => {
        expect(() => User.validateForRegistration(userFixtures.invalid))
          .toThrow(new ValidationError(['"user_name" must be a string'], 400));
      });
    };

    describe('with valid data', () => {
      let user;
      beforeEach(async () => {
        user = await User.validateForRegistration(userFixtures.valid);
      });

      test('it must return the user', () => {
        expect(user).toEqual(userFixtures.valid);
      });
    });
    describe('without an user_name', () => {
      validateField(
        userFixtures.invalid,
        '"user_name" must be a string',
      );
    });
    describe('without a name', () => {
      validateField(
        { ...userFixtures.valid, name: null },
        '"name" must be a string',
      );
    });
    describe('without an email', () => {
      validateField(
        { ...userFixtures.valid, credential: { ...userFixtures.valid.credential, email: null } },
        '"email" must be a string',
      );
    });
    describe('with an invalid email', () => {
      validateField(
        { ...userFixtures.valid, credential: { ...userFixtures.valid.credential, email: 'aeio2.com' } },
        '"email" must be a valid email',
      );
    });
    describe('without a password', () => {
      validateField(
        { ...userFixtures.valid, credential: { ...userFixtures.valid.credential, password: null } },
        'Password must contain at least one number, one lowercase and one uppercase letter and at least six characters that are letters, numbers or the underscore',
      );
    });
    describe('with an invalid password', () => {
      validateField(
        { ...userFixtures.valid, credential: { ...userFixtures.valid.credential, password: 'AeiO@' } },
        'Password must contain at least one number, one lowercase and one uppercase letter and at least six characters that are letters, numbers or the underscore',
      );
    });
  });
});
