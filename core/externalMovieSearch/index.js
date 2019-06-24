const httpClient = require('../../adapters/communication/httpClient');

const API_ENDPOINT = process.env.TMDB_API_ENDPOINT;
const API_IMAGES_ENDPOINT = process.env.TMDB_IMAGES_ENDPOINT;
const API_KEY = process.env.TMDB_API_KEY;

const normalizeSearchURL = title => `${API_ENDPOINT}/search/movie?api_key=${API_KEY}&query=${title}&include_adult=false`;
const normalizeMovieDetailsURL = id => `${API_ENDPOINT}/movie/${id}?api_key=${API_KEY}`;
const normalizeHeaderImageURL = path => `${API_IMAGES_ENDPOINT}/${path}`;

// TODO escape title
const searchMovie = title => httpClient(
  normalizeSearchURL(title),
).then(res => JSON.parse(res.body));

const movieDetails = id => httpClient(
  normalizeMovieDetailsURL(id),
).then(res => JSON.parse(res.body));

const headerImage = path => httpClient(
  normalizeHeaderImageURL,
).then(res => JSON.parse(res.body));

module.exports = {
  searchMovie,
  movieDetails,
  headerImage,
};
