/**
 * https://developer.themoviedb.org/reference/
 * array containing objects with key-value pairs for TMDB API endpoints
 * each object represents an api "category" of endpoints
 */

export const tmdbEndPoints = {
  movie_lists: {
    nowPlaying: { key: 'movie_lists_nowPlaying', label: 'Now Playing', endPoint: 'https://api.themoviedb.org/3/movie/now_playing' },
    popular: { key: 'movie_lists_popular', label: 'Popular', endPoint: 'https://api.themoviedb.org/3/movie/popular' },
    topRated: { key: 'movie_lists_topRated', label: 'Top Rated', endPoint: 'https://api.themoviedb.org/3/movie/top_rated' },
    upcoming: { key: 'movie_lists_upcoming', label: 'Upcoming', endPoint: 'https://api.themoviedb.org/3/movie/upcoming' },
  },

  movie_trending: {
    trendingDay: { key: 'movie_trending_trendingDay', label: 'Trending Today', endPoint: 'https://api.themoviedb.org/3/trending/movie/day' },
    trendingWeek: { key: 'movie_trending_trendingWeek', label: 'Trending This Week', endPoint: 'https://api.themoviedb.org/3/trending/movie/week' },
  },

  movie_information: {
    details: { key: 'movie_information_details', endPoint: 'https://api.themoviedb.org/3/movie/{movie_id}' },
    releaseDates: { key: 'movie_information_releaseDates', endPoint: 'https://api.themoviedb.org/3/movie/{movie_id}/release_dates' },
    watchProviders: { key: 'movie_information_watchProviders', endPoint: 'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers' },
    credits: { key: 'movie_information_credits', endPoint: 'https://api.themoviedb.org/3/movie/{movie_id}/credits' },
    similar: { key: 'movie_information_similar', endPoint: 'https://api.themoviedb.org/3/movie/{movie_id}/similar' },
    recommendations: { key: 'movie_information_recommendations', endPoint: 'https://api.themoviedb.org/3/movie/{movie_id}/recommendations' },
  },

  movie_search_keywords: { key: 'movie_search_keywords', endPoint: 'https://api.themoviedb.org/3/movie/{movie_id}/keywords' },
  movie_trailer_videos: { key: 'movie_trailer_videos', endPoint: 'https://api.themoviedb.org/3/movie/{movie_id}/videos' },

  movie_discover: { key: 'movie_discover', endPoint: 'https://api.themoviedb.org/3/discover/movie' },
};
