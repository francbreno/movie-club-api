const Round = require('./round');
const Club = require('./club');

const DEFAULT_MOVIE = { title: 'The Matrix' };
const DEFAULT_USER = { id: 1 };
const DEFAULT_MEMBER = { userId: 1 };
const DEFAULT_DEADLINE = Date.now();
const DEFAULT_ACTIVE = false;

const DEFAULT_CLUB = Club.create(
  'Test Club',
  DEFAULT_USER,
  [DEFAULT_MEMBER],
);

function newBasicRound() {
  return {
    member: DEFAULT_MEMBER,
    club: DEFAULT_CLUB,
    deadline: DEFAULT_DEADLINE,
    active: DEFAULT_ACTIVE,
    watchedBy: [],
  };
}

describe('core/club/round', () => {
  let round;
  beforeEach(() => {
    round = newBasicRound();
  });

  describe('create', () => {
    describe('creating a new round', () => {
      let newRound;
      beforeEach(() => {
        newRound = Round.create(DEFAULT_CLUB, DEFAULT_MEMBER, DEFAULT_DEADLINE);
      });

      test('Must return a new round', () => {
        expect(newRound).toEqual(round);
      });
      test('belonging to the expected club', () => {
        expect(newRound.club).toEqual(round.club);
      });
      test('belonging to the expected user', () => {
        expect(newRound.member).toEqual(round.member);
      });
      test('with the expected deadline', () => {
        expect(newRound.deadline).toEqual(round.deadline);
      });
    });
  });

  describe('finish', () => {
    describe('Finishing an active round', () => {
      let newRound;
      beforeEach(() => {
        round.active = true;
        newRound = Round.finish(round);
      });

      test('round must be deactivated', () => {
        expect(newRound.status).toBeFalsy();
      });
    });
  });

  describe('setMovie', () => {
    describe("Setting the round's movie", () => {
      let newRound;
      beforeEach(() => {
        round.active = true;
        newRound = Round.setMovie(round, DEFAULT_MEMBER, DEFAULT_MOVIE);
      });

      test('movie must be set', () => {
        expect(newRound.movie).toBeDefined();
      });
      test('and the setted movie must be the expected one', () => {
        expect(newRound.movie).toEqual(DEFAULT_MOVIE);
      });
    });

    describe('An inactive round cannot allow a movie to be set on', () => {
      test('throw an exception and movie is not set', () => {
        expect(() => {
          Round.setMovie(round, DEFAULT_MEMBER, DEFAULT_MOVIE);
        }).toThrow();
        // TODO - check movie value
      });
    });

    describe('Only the owner of the round can set a movie', () => {
      const aMember = { userId: 999999 };

      test('throw an exception and movie is not set', () => {
        expect(() => {
          round.active = true;
          Round.setMovie(round, aMember, DEFAULT_MOVIE);
        }).toThrow();
        // TODO - check movie value
      });
    });
  });

  describe('watch', () => {
    describe('Watch a round', () => {
      let newRound;
      beforeEach(() => {
        round.active = true;
        newRound = Round.watch(round, DEFAULT_MEMBER);
      });

      test("Member must be added to the round's watchers list", () => {
        expect(newRound.watchedBy).toHaveLength(1);
      });
    });

    describe('Cannot watch an inactive round', () => {
      test("throw an exception and Member is not added to the round's watchers list", () => {
        expect(() => {
          Round.watch(round, DEFAULT_MEMBER);
        }).toThrow();
        // TODO - check movie value
      });
    });
  });
});
