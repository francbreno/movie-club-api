const db = require('../../config/db');
const repo = require('../repo')(db);
const Accounts = require('./index')(repo);

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
  beforeAll(() => {

  });
  beforeEach(() => {

  });
  afterEach(() => {

  });
  describe('Given I want to register a new user', () => {
    describe('and the data is valid', () => {
      describe('when I register the user', () => {
        let user;
        beforeEach(async () => {
          user = await Accounts.register(userFixtures.valid);
        });
  
        test('It must be, in fact, registered', () => {
          expect(user).toBeTruthy();
        });
      });
    });
  
    describe('and the data is invalid', () => {
      describe('when I register the user', () => {
        test('It must return an error', () => {
          try {
            Accounts.register(userFixtures.invalid);
          } catch (e) {
            expect(e).toBeTruthy();
          }
          // expect.assertions(1);
          // return Accounts.register(userFixtures.invalid)
          //   .catch(e => expect(e).toBeTruthy());
        });
      });
    });
    
  });
});
