/**
 * https://developer.themoviedb.org/reference/
 * array containing objects with key-value pairs for TMDB API endpoints
 * each object represents an api "category" of endpoints
 */

type Prefab_List_Keys = 'now_playing' | 'upcoming' | 'popular' | 'top_rated' | 'trending_today' | 'trending_this_week';
type GetIdList_Keys = 'discover';
type GetIdData_Keys = 'details' | 'credits' | 'keywords' | 'recommendations' | 'releaseDates' | 'reviews' | 'similar' | 'videos' | 'watchProviders';

export type Type_Tmdb_Movie_Keys_Union = Prefab_List_Keys | GetIdData_Keys | GetIdList_Keys;

export type Type_Tmdb_Movie_Endpoints = {
  prefabList: [Prefab_List_Keys, string][];
  getIdData: [GetIdData_Keys, string][];
  getIdList: [GetIdList_Keys, string][];
};

export const tmdbMovieEndpoints: Type_Tmdb_Movie_Endpoints = {
  prefabList: [
    ['now_playing', 'https://api.themoviedb.org/3/movie/now_playing'],
    ['upcoming', 'https://api.themoviedb.org/3/movie/upcoming'],
    ['popular', 'https://api.themoviedb.org/3/movie/popular'],
    ['top_rated', 'https://api.themoviedb.org/3/movie/top_rated'],
    ['trending_today', 'https://api.themoviedb.org/3/trending/movie/day'],
    ['trending_this_week', 'https://api.themoviedb.org/3/trending/movie/week'],
  ],
  getIdList: [['discover', 'https://api.themoviedb.org/3/discover/movie{genre_ids}']],
  getIdData: [
    ['details', 'https://api.themoviedb.org/3/movie/{movie_id}'],
    ['credits', 'https://api.themoviedb.org/3/movie/{movie_id}/credits'],
    ['keywords', 'https://api.themoviedb.org/3/movie/{movie_id}/keywords'],
    ['recommendations', 'https://api.themoviedb.org/3/movie/{movie_id}/recommendations'],
    ['releaseDates', 'https://api.themoviedb.org/3/movie/{movie_id}/release_dates'],
    ['reviews', 'https://api.themoviedb.org/3/movie/{movie_id}/reviews'],
    ['similar', 'https://api.themoviedb.org/3/movie/{movie_id}/similar'],
    ['videos', 'https://api.themoviedb.org/3/movie/{movie_id}/videos'],
    ['watchProviders', 'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers'],
  ],
};
