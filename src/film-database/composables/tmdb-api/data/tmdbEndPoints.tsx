/**
 * https://developer.themoviedb.org/reference/
 * array containing objects with key-value pairs for TMDB API endpoints
 * each object represents an api "category" of endpoints
 */

type GetPrefabList_Keys = 'now_playing' | 'upcoming' | 'popular' | 'top_rated' | 'trending_today' | 'trending_this_week';
type GetIdData_Keys = 'discover' | 'details' | 'credits' | 'keywords' | 'recommendations' | 'releaseDates' | 'reviews' | 'similar' | 'videos' | 'watchProviders';

export type Type_Tmdb_Movie_Keys_Union = GetPrefabList_Keys | GetIdData_Keys;

type Type_Tmdb_Movie_Endpoints = {
  getPrefabList: Record<GetPrefabList_Keys, string>;
  getIdData: Record<GetIdData_Keys, string>;
};

export const tmdbMovieEndpoints: Type_Tmdb_Movie_Endpoints = {
  getPrefabList: {
    now_playing: 'https://api.themoviedb.org/3/movie/now_playing',
    upcoming: 'https://api.themoviedb.org/3/movie/upcoming',
    popular: 'https://api.themoviedb.org/3/movie/popular',
    top_rated: 'https://api.themoviedb.org/3/movie/top_rated',
    trending_today: 'https://api.themoviedb.org/3/trending/movie/day',
    trending_this_week: 'https://api.themoviedb.org/3/trending/movie/week',
  },
  getIdData: {
    discover: 'https://api.themoviedb.org/3/discover/movie{genre_ids}',
    details: 'https://api.themoviedb.org/3/movie/{movie_id}',
    credits: 'https://api.themoviedb.org/3/movie/{movie_id}/credits',
    keywords: 'https://api.themoviedb.org/3/movie/{movie_id}/keywords',
    recommendations: 'https://api.themoviedb.org/3/movie/{movie_id}/recommendations',
    releaseDates: 'https://api.themoviedb.org/3/movie/{movie_id}/release_dates',
    reviews: 'https://api.themoviedb.org/3/movie/{movie_id}/reviews',
    similar: 'https://api.themoviedb.org/3/movie/{movie_id}/similar',
    videos: 'https://api.themoviedb.org/3/movie/{movie_id}/videos',
    watchProviders: 'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers',
  },
};
