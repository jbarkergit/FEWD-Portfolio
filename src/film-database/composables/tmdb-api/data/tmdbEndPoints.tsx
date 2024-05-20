/**
 * https://developer.themoviedb.org/reference/
 * array containing objects with key-value pairs for TMDB API endpoints
 * each object represents an api "category" of endpoints
 */

export type Type_Tmdb_Movie_Endpoints = {
  theatrical: Map<string, string>;
  hot: Map<string, string>;
  trending: Map<string, string>;
  informationById: Map<string, string>;
  searchById: Map<string, string>;
};

export const tmdbMovieEndpoints: Type_Tmdb_Movie_Endpoints = {
  theatrical: new Map([
    ['now_playing', 'https://api.themoviedb.org/3/movie/now_playing'],
    ['upcoming', 'https://api.themoviedb.org/3/movie/upcoming'],
  ]),
  hot: new Map([
    ['popular', 'https://api.themoviedb.org/3/movie/popular'],
    ['top_rated', 'https://api.themoviedb.org/3/movie/top_rated'],
  ]),
  trending: new Map([
    ['trending_today', 'https://api.themoviedb.org/3/trending/movie/day'],
    ['trending_this_week', 'https://api.themoviedb.org/3/trending/movie/week'],
  ]),
  informationById: new Map([
    ['details', 'https://api.themoviedb.org/3/movie/{movie_id}'],
    ['releaseDates', 'https://api.themoviedb.org/3/movie/{movie_id}/release_dates'],
    ['watchProviders', 'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers'],
    ['credits', 'https://api.themoviedb.org/3/movie/{movie_id}/credits'],
    ['similar', 'https://api.themoviedb.org/3/movie/{movie_id}/similar'],
    ['recommendations', 'https://api.themoviedb.org/3/movie/{movie_id}/recommendations'],
  ]),
  searchById: new Map([
    ['movie', 'https://api.themoviedb.org/3/search/{movie_id}'],
    ['discover', 'https://api.themoviedb.org/3/discover/{movie_id}'],
    ['keyword', 'https://api.themoviedb.org/3/movie/{movie_id}/keywords'],
    ['trailers', 'https://api.themoviedb.org/3/movie/{movie_id}/videos'],
  ]),
};
