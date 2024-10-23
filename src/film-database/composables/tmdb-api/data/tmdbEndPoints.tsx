/** Category Key Types */

export namespace Namespace_TmdbEndpointsKeys {
  export type Prefabs_Keys = 'now_playing' | 'upcoming' | 'popular' | 'top_rated' | 'trending_today' | 'trending_this_week';
  export type MovieId_Keys = 'details' | 'credits' | 'videos' | 'watchProviders' | 'reviews' | 'recommendations';
  export type Miscellaneous_Keys = 'discover' | 'search';
  export type Keys_Union = Prefabs_Keys | MovieId_Keys | Miscellaneous_Keys;
  export type Endpoint_Obj = {
    prefabs: Record<Prefabs_Keys, string>;
    movieId: Record<MovieId_Keys, string>;
    miscellaneous: Record<Miscellaneous_Keys, string>;
  };
}

/** Endpoint Collection */
export const tmdbEndpoints: Namespace_TmdbEndpointsKeys.Endpoint_Obj = {
  prefabs: {
    now_playing: 'https://api.themoviedb.org/3/movie/now_playing',
    upcoming: 'https://api.themoviedb.org/3/movie/upcoming',
    popular: 'https://api.themoviedb.org/3/movie/popular',
    top_rated: 'https://api.themoviedb.org/3/movie/top_rated',
    trending_today: 'https://api.themoviedb.org/3/trending/movie/day',
    trending_this_week: 'https://api.themoviedb.org/3/trending/movie/week',
  },
  movieId: {
    details: 'https://api.themoviedb.org/3/movie/{movie_id}',
    credits: 'https://api.themoviedb.org/3/movie/{movie_id}/credits',
    videos: 'https://api.themoviedb.org/3/movie/{movie_id}/videos',
    watchProviders: 'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers',
    reviews: 'https://api.themoviedb.org/3/movie/{movie_id}/reviews',
    recommendations: 'https://api.themoviedb.org/3/movie/{movie_id}/recommendations',
  },
  miscellaneous: {
    discover: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=',
    search: 'https://api.themoviedb.org/3/search/movie&query={search_term}&include_adult=false&language=en-US',
  },
};
