const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../config/db');
const repo = require('../repo')(db);
const User = require('./user')(repo);
const Credential = require('./credential')(repo);
const ValidationError = require('../../utils/ValidationError');

const INVALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDUwNjE3NTAsImV4cCI6NDEzNzA2MTc1MH0.q1zr6CB2saC6Tf3BMlRlrF3HeSOxEZbXgE6BRmPbr2E';

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

describe('Accounts Context - credential', () => {
  describe('putPasswordHash', () => {
    let updatedCredential;
    beforeEach(() => {
      updatedCredential = Credential.putPasswordHash(userFixtures.valid.credential);
    });

    test('Must add property password_hash', () => {
      expect(updatedCredential).toHaveProperty('password_hash');
    });
    test('password_hash must not be null', () => {
      expect(updatedCredential.password_hash).toBeDefined();
    });
  });

  describe('validate', () => {
    describe('when credential is valid', () => {
      let result;
      beforeEach(() => {
        result = Credential.validate(userFixtures.valid.credential);
      });

      it('must not return errors', () => {
        expect(result.error).toBeNull();
      });
      it('value must be equal to informed credential', () => {
        expect(result.value).toEqual(userFixtures.valid.credential);
      });
    });

    describe('when email is invalid', () => {
      let result;
      beforeEach(() => {
        result = Credential.validate({ ...userFixtures.valid.credential, email: 'aninvalidemail.com' });
      });

      it('must return errors', () => {
        expect(result.error).toBeDefined();
      });
      it('must return email error message', () => {
        expect(result.error.details[0].message).toBe('"email" must be a valid email');
      });
    });

    describe('when password is invalid', () => {
      let result;
      beforeEach(() => {
        result = Credential.validate({ ...userFixtures.valid.credential, password: 'abc123' });
      });

      it('must return errors', () => {
        expect(result.error).toBeDefined();
      });
      it('must return password error message', () => {
        expect(result.error.details[0].message).toEqual('Password must contain at least one number, one lowercase and one uppercase letter and at least six characters that are letters, numbers or the underscore');
      });
    });
  });
  describe('verifyToken', () => {
    describe('when token is valid', () => {
      let id;
      beforeEach(() => {
        const token = jwt.sign({ id: 1 }, process.env.SECRET_KEY, { expiresIn: 30 * 24 * 60 * 60 * 1000 });
        console.log(token);
        id = Credential.verifyToken(token);
      });

      it('must return the user\'s id', () => {
        expect(id).toBe(1);
      });
    });
    describe('when token is invalid', () => {
      it('must throw an error', () => {
        const run = () => Credential.verifyToken(INVALID_TOKEN);
        expect(run).toThrowError('invalid signature');
      });
    });
  });

  describe('generateToken', () => {
    let token;
    beforeEach(() => {
      token = Credential.generateToken({ id: 9 });
    });

    it('must return a token', () => {
      expect(token).toBeDefined();
    });
  });

  describe('checkUser', () => {
    const password = 'p@radi5eL0st';
    const user = {
      name: 'John Milton',
      user_name: 'johnmilton',
      credential: {
        email: 'milton.john@gmail.com',
        password_hash: bcrypt.hashSync(password, bcrypt.genSaltSync(12)),
      },
    };

    describe('with correct password', () => {
      let userReturned;
      beforeEach(() => {
        userReturned = Credential.checkUser(password, user);
      });

      it('must return the user', () => {
        expect(userReturned).toEqual(user);
      });
    });

    describe('with incorrect password', () => {
      it('must throw an error', () => {
        const run = () => Credential.checkUser('wr0ng_Pas5word', user);
        expect(run).toThrow('Invalid email and/or password');
      });
    });
  });

  describe('create', () => {
    // Credential.create();
  });

  describe('schema', () => {
    // Credential.schema();
  });
});
