const BASE_URL = 'https://api.themoviedb.org/3/';
const QUERY_PARAMS = 'language=en-US&page=1&region=US';
const ADULT_PARAMS = '&include_adult=false';

export const tmdbEndpoints = {
  never: {
    now_playing: `${BASE_URL}movie/now_playing?${QUERY_PARAMS}`,
    popular: `${BASE_URL}movie/popular?${QUERY_PARAMS}`,
    top_rated: `${BASE_URL}movie/top_rated?${QUERY_PARAMS}`,
    trending_this_week: `${BASE_URL}trending/movie/week?${QUERY_PARAMS}`,
    trending_today: `${BASE_URL}trending/movie/day?${QUERY_PARAMS}`,
    upcoming: `${BASE_URL}movie/upcoming?${QUERY_PARAMS}`,
  },
  number: {
    credits: `${BASE_URL}movie/{movie_id}/credits`,
    details: `${BASE_URL}movie/{movie_id}`,
    recommendations: `${BASE_URL}movie/{movie_id}/recommendations`,
    reviews: `${BASE_URL}movie/{movie_id}/reviews`,
    videos: `${BASE_URL}movie/{movie_id}/videos`,
    watchProviders: `${BASE_URL}movie/{movie_id}/watch/providers`,
    discover: `${BASE_URL}discover/movie?with_genres={genre_id}`,
  },
  string: {
    search: `${BASE_URL}search/movie?query={search_term}&${QUERY_PARAMS}${ADULT_PARAMS}`,
  },
} as const;
