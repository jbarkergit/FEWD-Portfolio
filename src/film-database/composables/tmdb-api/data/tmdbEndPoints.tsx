/**
 * https://developer.themoviedb.org/reference/
 * array containing objects with key-value pairs for TMDB API endpoints
 * each object represents an api "category" of endpoints
 */

type Theatrical_Keys = 'now_playing' | 'upcoming';
type Hot_Keys = 'popular' | 'top_rated';
type Trending_Keys = 'trending_today' | 'trending_this_week';
type InformationById_Keys = 'details' | 'releaseDates' | 'watchProviders' | 'credits' | 'similar' | 'recommendations';
type SearchById_Keys = 'genre' | 'movie' | 'discover' | 'keyword' | 'trailers';

export type Type_Tmdb_Movie_Keys_Union = Theatrical_Keys | Hot_Keys | Trending_Keys | InformationById_Keys | SearchById_Keys;

export type Type_Tmdb_Movie_Endpoints = {
  theatrical: Map<Theatrical_Keys, string>;
  hot: Map<Hot_Keys, string>;
  trending: Map<Trending_Keys, string>;
  informationById: Map<InformationById_Keys, string>;
  searchById: Map<SearchById_Keys, string>;
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
    ['genre', 'https://api.themoviedb.org/3/genre/movie/list&with_genres={genre_id}'],
    ['movie', 'https://api.themoviedb.org/3/discover/{movie_id}'],
    ['discover', 'https://api.themoviedb.org/3/discover/{movie_id}'],
    ['keyword', 'https://api.themoviedb.org/3/movie/{movie_id}/keywords'],
    ['trailers', 'https://api.themoviedb.org/3/movie/{movie_id}/videos'],
  ]),
};
