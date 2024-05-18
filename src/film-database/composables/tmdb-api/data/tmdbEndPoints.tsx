/**
 * https://developer.themoviedb.org/reference/
 * array containing objects with key-value pairs for TMDB API endpoints
 * each object represents an api "category" of endpoints
 */

export const tmdbMovieEndpoints = {
  theatrical: {
    now_playing: 'https://api.themoviedb.org/3/movie/now_playing',
    upcoming: 'https://api.themoviedb.org/3/movie/upcoming',
  },
  hot: {
    popular: 'https://api.themoviedb.org/3/movie/popular',
    top_rated: 'https://api.themoviedb.org/3/movie/top_rated',
  },
  trending: {
    trending_today: 'https://api.themoviedb.org/3/trending/movie/day',
    trending_this_week: 'https://api.themoviedb.org/3/trending/movie/week',
  },
  informationById: {
    details: 'https://api.themoviedb.org/3/movie/{movie_id}',
    releaseDates: 'https://api.themoviedb.org/3/movie/{movie_id}/release_dates',
    watchProviders: 'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers',
    credits: 'https://api.themoviedb.org/3/movie/{movie_id}/credits',
    similar: 'https://api.themoviedb.org/3/movie/{movie_id}/similar',
    recommendations: 'https://api.themoviedb.org/3/movie/{movie_id}/recommendations',
  },
  searchById: {
    movie: 'https://api.themoviedb.org/3/search/movie',
    discover: 'https://api.themoviedb.org/3/discover/movie',
    keyword: 'https://api.themoviedb.org/3/movie/{movie_id}/keywords',
    trailers: 'https://api.themoviedb.org/3/movie/{movie_id}/videos',
  },
};
