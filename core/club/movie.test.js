const Movie = require('./movie');

const DEFAULT_MOVIE_DATA = { title: 'The Matrix' };
const DEFAULT_MOVIE = {
  ...DEFAULT_MOVIE_DATA,
  round: null,
  ratings: [],
};

describe('core/club/movie', () => {
  describe('create', () => {
    describe('creating a new movie', () => {
      let newMovie;
      beforeEach(() => {
        newMovie = Movie.create(DEFAULT_MOVIE_DATA);
      });

      test('Must return a new movie', () => {
        expect(newMovie).toEqual(DEFAULT_MOVIE);
      });
    });
  });

  describe('setMovieInARound', () => {
    describe('setting a movie in an active round', () => {
      const round = { id: 1, active: true };

      let newMovie;
      beforeEach(() => {
        newMovie = Movie.setMovieInARound(DEFAULT_MOVIE, round);
      });

      test('Must bound the movie to the round', () => {
        expect(newMovie.round).toEqual(round);
      });
    });

    describe('An inactive round cannot be bound to a movie', () => {
      const round = { id: 1, active: false };

      test('Must return a new round', () => {
        expect(() => {
          Movie.setMovieInARound(DEFAULT_MOVIE, round);
        }).toThrow();
        // TODO - check movie value
      });
    });
  });

  describe('rate', () => {
    describe('rating a movie', () => {
      const member = { userId: 1 };
      const memberRating = { rating: 4 };

      let newMovie;
      beforeEach(() => {
        newMovie = Movie.rate(DEFAULT_MOVIE, member, memberRating.rating);
      });

      test('Must bound the movie to the round', () => {
        expect(newMovie.ratings).toHaveLength(1);
      });

      test('Must bound the movie to the round', () => {
        expect(newMovie.ratings).toContainEqual({ member, ...memberRating });
      });
    });

    describe('rating a movie with an invalid score', () => {
      const member = { userId: 1 };
      const memberRating = { rating: 6 };

      test('Must bound the movie to the round', () => {
        expect(() => {
          Movie.rate(DEFAULT_MOVIE, member, memberRating.rating);
        }).toThrow();
        // TODO - check movie value
      });
    });
  });
});
