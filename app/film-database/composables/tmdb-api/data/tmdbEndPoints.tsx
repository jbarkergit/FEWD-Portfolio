/** Category Key Types */

export namespace Namespace_TmdbEndpointsKeys {
  export type Prefabs_Keys = 'now_playing' | 'upcoming' | 'popular' | 'top_rated' | 'trending_today' | 'trending_this_week';
  export type MovieId_Keys = 'details' | 'credits' | 'videos' | 'watchProviders' | 'reviews' | 'recommendations';
  export type Miscellaneous_Keys = 'discover' | 'search';
  export type Keys_Credits = 'credits' | 'cast' | 'crew';

  export type Keys_Union = Prefabs_Keys | MovieId_Keys | Miscellaneous_Keys | Keys_Credits;

  export type Endpoint_Obj = {
    prefabs: Record<Prefabs_Keys, string>;
    movieId: Record<MovieId_Keys, string>;
    miscellaneous: Record<Miscellaneous_Keys, string>;
  };
}

/** Endpoint Collection */
const tmdb: string = 'https://api.themoviedb.org/3/';

export const tmdbEndpoints: Namespace_TmdbEndpointsKeys.Endpoint_Obj = {
  prefabs: {
    now_playing: tmdb + 'movie/now_playing',
    upcoming: tmdb + 'movie/upcoming',
    popular: tmdb + 'movie/popular',
    top_rated: tmdb + 'movie/top_rated',
    trending_today: tmdb + 'trending/movie/day',
    trending_this_week: tmdb + 'trending/movie/week',
  },
  movieId: {
    details: tmdb + 'movie/{movie_id}',
    credits: tmdb + 'movie/{movie_id}/credits',
    videos: tmdb + 'movie/{movie_id}/videos',
    watchProviders: tmdb + 'movie/{movie_id}/watch/providers',
    reviews: tmdb + 'movie/{movie_id}/reviews',
    recommendations: tmdb + 'movie/{movie_id}/recommendations',
  },
  miscellaneous: {
    discover: tmdb + 'discover/movie',
    search: tmdb + 'search/movie&query={search_term}',
  },
};
