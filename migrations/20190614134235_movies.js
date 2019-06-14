/**
 * = Data obtained from the TMDB API
 * id: number
 * imdbID: number
 * backdrop_url: string
 * poster: string
 * genres: collection
 * original_language: string
 * original_title: string
 * release_date: string
 * tagline: string
 * title: string
 * budget: number
 * revenue: number
 * runtime: number
 */

exports.up = function up(knex, Promise) {
  return knex.schema.createTable('movies', (table) => {
    table.string('imdbID');
    table.string('backgropUrl');
    table.string('posterUrl');
    table.string('originalLanguage');
    table.string('originalTitle');
    table.string('releaseDate');
    table.string('tagline');
    table.string('title');
    table.string('genres');
    table.integer('runtime');
    table.integer('budget');
    table.integer('revenue');
  });
};

exports.down = function down(knex, Promise) {
  return knex.schema.dropTable('movies');
};
