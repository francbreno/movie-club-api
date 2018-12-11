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

describe('Accounts Context', () => {
  beforeEach(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });

  afterEach(async () => {
    await db.migrate.rollback();
  });

  describe('Given I want to register a new user', () => {
    describe('with valid data', () => {
      describe('when I register this user', () => {
        let userReturned;
        beforeEach(async () => {
          userReturned = await User.register(userFixtures.valid);
        });

        test('it must be persisted', async () => {
          console.log(userReturned);
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
    });
    describe('with invalid data', () => {
      describe('when I register this user', () => {
        test('it throws an error', async () => {
          await expect(User.register(userFixtures.invalid)).rejects.toBeTruthy();
        });
      });
    });
  });

  describe('Given I want to find a user by email', () => {
    describe('with a valid email from an existing user', () => {
      let credential;
      beforeEach(async () => {
        const anUser = await User.getAll().first();
        credential = await Credential.find({ user_id: anUser.id }).first();
      });
      describe('when I ask for this user', () => {
        let user;
        beforeEach(async () => {
          user = await User.findByEmail(credential.email);
        });

        test('it must be returned', async () => {
          expect(user).toBeDefined();
        });
        test('and must have the same email', async () => {
          expect(user.email).toBe(credential.email);
        });
      });
    });
    describe('with a valid email from an inexistent user', () => {
      describe('when I ask for this user', () => {
        let user;
        beforeEach(async () => {
          user = await User.findByEmail(userFixtures.invalid.credential.email);
        });

        test('it must return no user', async () => {
          expect(user).toBeUndefined();
        });
      });
    });
  });

  describe('Given I want to validate a user for registration', () => {
    describe('when validate the user', () => {
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

        test('it must return the user', async () => {
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
});
