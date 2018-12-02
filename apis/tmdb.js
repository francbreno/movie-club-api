const got = require('got');

const API_ENDPOINT = process.env.TMDB_API_ENDPOINT;
const API_IMAGES_ENDPOINT = process.env.TMDB_IMAGES_ENDPOINT;
const API_KEY = process.env.TMDB_API_KEY;

// https://api.themoviedb.org/3/search/movie?api_key=c09049db1c5f3ae6a49f35f848b05d9b&query=matrix&include_adult=false
const normalizeSearchURL = title => `${API_ENDPOINT}/search/movie?api_key=${API_KEY}&query=${title}&include_adult=false`;
// https://api.themoviedb.org/3/movie/603?api_key=c09049db1c5f3ae6a49f35f848b05d9b
const normalizeMovieDetailsURL = id => `${API_ENDPOINT}/movie/${id}?api_key=${API_KEY}`;
//
const normalizeHeaderImageURL = path => `${API_IMAGES_ENDPOINT}/${path}`;

// TODO escape title
exports.searchMovie = title => got(normalizeSearchURL(title)).then(res => JSON.parse(res.body));
exports.movieDetails = id => got(normalizeMovieDetailsURL(id)).then(res => JSON.parse(res.body));
exports.headerImage = path => got(normalizeHeaderImageURL).then(res => JSON.parse(res.body));
