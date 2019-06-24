const got = require('got');

const API_ENDPOINT = process.env.TMDB_API_ENDPOINT;
const API_IMAGES_ENDPOINT = process.env.TMDB_IMAGES_ENDPOINT;
const API_KEY = process.env.TMDB_API_KEY;

const normalizeSearchURL = title => `${API_ENDPOINT}/search/movie?api_key=${API_KEY}&query=${title}&include_adult=false`;
const normalizeMovieDetailsURL = id => `${API_ENDPOINT}/movie/${id}?api_key=${API_KEY}`;
const normalizeHeaderImageURL = path => `${API_IMAGES_ENDPOINT}/${path}`;

// TODO escape title
exports.searchMovie = title => got(normalizeSearchURL(title)).then(res => JSON.parse(res.body));
exports.movieDetails = id => got(normalizeMovieDetailsURL(id)).then(res => JSON.parse(res.body));
exports.headerImage = path => got(normalizeHeaderImageURL).then(res => JSON.parse(res.body));
