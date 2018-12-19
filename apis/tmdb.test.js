const tmdb = require('./tmdb');

describe('TMDB API', () => {
  describe('Search movie', () => {
    let response;
    beforeEach(async () => {
      response = await tmdb.searchMovie('matrix');
      console.log(response);
    });

    it('must return status OK', () => {
      expect(response).toBe(200);
    });
  });
});
