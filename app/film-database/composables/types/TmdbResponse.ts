import type { tmdbEndpoints } from '~/film-database/composables/const/tmdbEndpoints';

export type TmdbNeverKeys = keyof typeof tmdbEndpoints.never;
export type TmdbNumberKeys = keyof typeof tmdbEndpoints.number;
export type TmdbStringKeys = keyof typeof tmdbEndpoints.string;
export type TmdbEndpointKeys = TmdbNeverKeys | TmdbNumberKeys | TmdbStringKeys;

export type TmdbMovieProvider = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type PaginatedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

type WatchProvidersResponseProvider = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
};
type WatchProviderCountry = {
  link: string;
  flatrate?: WatchProvidersResponseProvider[];
  buy?: WatchProvidersResponseProvider[];
  rent?: WatchProvidersResponseProvider[];
  ads?: WatchProvidersResponseProvider[];
};

type CreditsProvider = {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
};

type PersonCreditsProvider = {
  adult: boolean;
  backdrop_path: string;
  character: string;
  credit_id: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  order: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TmdbResponse = {
  never: {
    now_playing: {
      dates: {
        maximum: string;
        minimum: string;
      };
    } & PaginatedResponse<TmdbMovieProvider>;
    popular: PaginatedResponse<TmdbMovieProvider>;
    top_rated: PaginatedResponse<TmdbMovieProvider>;
    trending_this_week: PaginatedResponse<TmdbMovieProvider>;
    trending_today: PaginatedResponse<TmdbMovieProvider>;
    upcoming: {
      dates: {
        maximum: string;
        minimum: string;
      };
    } & PaginatedResponse<TmdbMovieProvider>;
  };
  number: {
    credits: {
      id: number;
      cast: (CreditsProvider & {
        cast_id: number;
        character: string;
        order: number;
      })[];
      crew: (CreditsProvider & {
        department: string;
        job: string;
      })[];
    };
    details: {
      adult: boolean;
      backdrop_path: string | null;
      belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string | null;
        backdrop_path: string | null;
      } | null;
      budget: number;
      genres: {
        id: number;
        name: string;
      }[];
      homepage: string | null;
      id: number;
      imdb_id: string | null;
      origin_country: string[];
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string | null;
      production_companies: {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
      }[];
      production_countries: {
        iso_3166_1: string;
        name: string;
      }[];
      release_date: string;
      revenue: number;
      runtime: number | null;
      spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
      }[];
      status: string;
      tagline: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    };
    recommendations: PaginatedResponse<TmdbMovieProvider & { media_type: 'movie' }>;
    reviews: { id: number } & PaginatedResponse<
      {
        author: string;
        author_details: {
          name: string;
          username: string;
          avatar_path: string | null;
          rating: number | null;
        };
        content: string;
        created_at: string;
        id: string;
        updated_at: string;
        url: string;
      }[]
    >;
    videos: {
      id: number;
      results: {
        iso_639_1: string;
        iso_3166_1: string;
        name: string;
        key: string;
        site: string;
        size: number;
        type: string;
        official: boolean;
        published_at: string;
        id: string;
      }[];
    };
    watchProviders: {
      id: number;
      results: {
        // [countryCode: string]: WatchProviderCountry;
        US: WatchProviderCountry;
      };
    };
    discover: PaginatedResponse<TmdbMovieProvider>;
    personDetails: {
      adult: boolean;
      also_known_as: string[];
      biography: string;
      birthday: string;
      deathday: string | null;
      gender: 2;
      homepage: string | null;
      id: number;
      imdb_id: string;
      known_for_department: string;
      name: string;
      place_of_birth: string;
      popularity: number;
      profile_path: string;
    };
    personCredits: {
      id: number;
      cast: PersonCreditsProvider[];
      crew: PersonCreditsProvider[];
    };
  };
  string: {
    search: PaginatedResponse<TmdbMovieProvider>;
  };
};

export type TmdbResponseFlat = {
  [K in
    | keyof TmdbResponse['never']
    | keyof TmdbResponse['number']
    | keyof TmdbResponse['string']]: K extends keyof TmdbResponse['never']
    ? TmdbResponse['never'][K]
    : K extends keyof TmdbResponse['number']
      ? TmdbResponse['number'][K]
      : K extends keyof TmdbResponse['string']
        ? TmdbResponse['string'][K]
        : never;
};
