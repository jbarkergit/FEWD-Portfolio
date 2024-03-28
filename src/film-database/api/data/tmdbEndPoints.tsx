/**
 * https://developer.themoviedb.org/reference/
 * array containing objects with key-value pairs for TMDB API endpoints
 * each object represents an api "category" of endpoints
 */

export const tmdbEndPoints = {
  movie_lists: [
    { key: 'nowPlaying', endPoint: 'https://api.themoviedb.org/3/movie/now_playing' },
    { key: 'popular', endPoint: 'https://api.themoviedb.org/3/movie/popular' },
    { key: 'topRated', endPoint: 'https://api.themoviedb.org/3/movie/top_rated' },
    { key: 'trending', endPoint: 'https://api.themoviedb.org/3/trending/movie/{time_window}' },
    { key: 'upcoming', endPoint: 'https://api.themoviedb.org/3/movie/upcoming' },
  ],

  movie_information: [
    { key: 'details', endPoint: 'https://api.themoviedb.org/3/movie/{movie_id}' },
    { key: 'releaseDates', endPoint: 'https://api.themoviedb.org/3/movie/{movie_id}/release_dates' },
    { key: 'watchProviders', endPoint: 'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers' },
    { key: 'credits', endPoint: 'https://api.themoviedb.org/3/movie/{movie_id}/credits' },
    { key: 'similar', endPoint: 'https://api.themoviedb.org/3/movie/{movie_id}/similar' },
    { key: 'recommendations', endPoint: 'https://api.themoviedb.org/3/movie/{movie_id}/recommendations' },
  ],

  movie_search: { key: 'keywords', endPoint: 'https://api.themoviedb.org/3/movie/{movie_id}/keywords' },
};
