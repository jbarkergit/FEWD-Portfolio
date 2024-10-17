/** Category Key Types */
type Type_Tmdb_Prefabs_Keys = 'now_playing' | 'upcoming' | 'popular' | 'top_rated' | 'trending_today' | 'trending_this_week';

type Type_Tmdb_MovieId_Keys = 'details' | 'credits' | 'videos' | 'watchProviders' | 'reviews' | 'recommendations';

type Type_Tmdb_Miscellaneous_Keys = 'discover' | 'genreQuerie';

export type Type_TmdbEndpoint_Keys_Union = Type_Tmdb_Prefabs_Keys | Type_Tmdb_MovieId_Keys | Type_Tmdb_Miscellaneous_Keys;

type Type_Tmdb_Endpoint_Obj = {
  prefabs: Record<Type_Tmdb_Prefabs_Keys, string>;
  movieId: Record<Type_Tmdb_MovieId_Keys, string>;
  miscellaneous: Record<Type_Tmdb_Miscellaneous_Keys, string>;
};

/** Endpoint Collection */
export const tmdbEndpoints: Type_Tmdb_Endpoint_Obj = {
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
    discover: 'https://api.themoviedb.org/3/discover/movie{genre_ids}',
    genreQuerie: 'https://api.themoviedb.org/3/search/movie',
  },
};
