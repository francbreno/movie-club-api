const Club = require('./club');

function newBasicClub() {
  return {
    founder: { id: 1 },
    title: 'Test Club',
    members: [],
    rounds: [],
  };
}

describe('core/club/club', () => {
  let club;

  beforeEach(() => {
    club = newBasicClub();
  });

  describe('create', () => {
    describe('Creating a new Club', () => {
      const title = 'Test Club';
      const founder = { id: 5 };
      const aUser = { id: 43 };
      const members = [aUser];

      const updatedClub = Club.create(title, founder, members);

      test('The title must be the specified one', () => {
        expect(updatedClub.title).toBe(title);
      });
      test('and founder must be the designated one', () => {
        expect(updatedClub.founder).toEqual(founder);
      });
      test('and members list must have 2 users', () => {
        expect(updatedClub.members).toHaveLength(2);
      });
      test('where one of them is the one in the provided list', () => {
        expect(updatedClub.members).toContainEqual({ userId: aUser.id });
      });
      test("and the other one is the club's founder", () => {
        expect(updatedClub.members).toContainEqual({ userId: founder.id });
      });
    });
  });

  describe('addMember', () => {
    describe('Adding a user as a new member', () => {
      const aUser = {
        id: 20,
      };

      let updatedClub;
      beforeEach(() => {
        updatedClub = Club.addMember(club, aUser);
      });

      test('the user must be added as a member', () => {
        expect(updatedClub.members).toContainEqual({ userId: aUser.id });
      });
    });

    describe("Adding an user that's already a club's member", () => {
      const aUser = {
        id: 5,
      };

      beforeEach(() => {
        club.members = [...club.members, { userId: aUser.id }];
      });

      test('Must throw an exception', () => {
        expect(() => {
          Club.addMember(club, aUser);
        }).toThrow();
      });
    });
  });

  describe('removeMember', () => {
    describe('Removing an existing member', () => {
      const aUser = {
        id: 20,
      };

      let updatedClub;
      beforeEach(() => {
        club.members = [...club.members, { userId: aUser.id }];
        updatedClub = Club.removeMember(club, aUser);
      });

      test('the user must be added as a member', () => {
        expect(updatedClub.members).not.toContainEqual({ userId: aUser.id });
      });
    });
  });

  describe('addRound', () => {
    describe('Adding a new round', () => {
      const aRound = {
        id: 1,
      };

      let updatedClub;
      beforeEach(() => {
        updatedClub = Club.addRound(club, aRound);
      });

      test("the round must be added in the club's rounds list", () => {
        expect(updatedClub.rounds).toContainEqual(aRound);
      });
    });
  });
});
