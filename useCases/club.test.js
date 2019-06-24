const Club = require('./club');

const MockRoundRepo = {
  findRoundWhereDeadlineIsNotDefined: jest.fn(),
};

let ClubUseCases;

describe('Use Cases - Club', () => {
  beforeAll(() => {
    ClubUseCases = Club(MockRoundRepo);
  });

  describe('findCurrentRound', () => {
    describe('when there is an open round', async () => {
      let round;

      MockRoundRepo.findRoundWhereDeadlineIsNotDefined.mockReturnValue({
        id: 1,
        memberId: 2,
        deadline: Date.now(),
      });

      beforeEach(async () => {
        round = await ClubUseCases.findCurrentRound();
      });

      test(`There's an open round`, () => {
        expect(round).toBeDefined();
      });
    });

    describe('when there is not an open round', async () => {
      let round;

      MockRoundRepo.findRoundWhereDeadlineIsNotDefined.mockReturnValue(null);

      beforeEach(async () => {
        round = await ClubUseCases.findCurrentRound();
      });

      test(`There's not an open round`, () => {
        expect(round).toBeNull();
      });
    });
  });
});