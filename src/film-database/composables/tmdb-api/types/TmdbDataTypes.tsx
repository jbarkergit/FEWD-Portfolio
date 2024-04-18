/** Custom Type Naming Convention Reference
 * Note: Use of underscores (_) is to offer clarity when utilizing type autocompletion
 *
 * #1. Type_ Preface
 *      e.g. Type_#2_#3_#4?_#5?
 *
 * #2. Identify where the type originates
 * Note: This must be location oriented and concise
 *      e.g. Type_Tmdb_#3_#4?_#5?
 *
 * #3. Assign unique identifier
 *      e.g. Type_Tmdb_Movie_#4_#5?
 *
 * #4. OPTIONAL: Define data structure if of types: Arr | Obj | Union
 *      e.g. Type_Tmdb_Movie_Union_#5?
 *
 * #5. OPTIONAL: Determine if desired output is potentially UNKNOWN | UNDEFINED | NULL, else OMIT
 * Note: Apply to types which may be undefined: VOID union types without an undefined return
 * Note: "is" preface, in lowercase, mandatory
 *  Could be Unknown -> isUnknown
 *  Could be Undefined -> isUndefined
 *  Could be Null -> isNullable
 *      e.g. Type_Tmdb_Movie_Map_isUndefined
 */

/** Fetcher Utility Api Call Types
 * TMDB Api Documentation does not provide call types; therefore, manual conversion is required to build respective data structures
 */
export type Type_Tmdb_ApiCallMovieList_Obj = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
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

export type Type_Tmdb_ApiCallMovie_Obj = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: any;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: { id: number; logo_path: string | null; name: string; origin_country: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Type_Tmdb_ApiCallTrailer_Obj = {
  value: never[];
  id: string;
  iso_3166_1: string;
  iso_639_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
};

export type Type_Tmdb_ApiCall_Union = Type_Tmdb_ApiCallMovieList_Obj | Type_Tmdb_ApiCallMovie_Obj | Type_Tmdb_ApiCallTrailer_Obj;

/** useTmdbApi && Fetcher Utility Key-value Pair Payload (For when parameters aren't required) */
export type Type_Tmdb_KeyValuePair_Obj = { key: string; label?: string | undefined; endPoint: string };

/** BAREBONE Payload Optional Parameters: Necessary for Payload Destructuring or Type Guard */
export type Type_Tmdb_MovieIdParam_Obj = { typeGuardKey: string; propValue: string };
export type Type_Tmdb_PersonIdParam_Obj = { typeGuardKey: string; propValue: string };
export type Type_Tmdb_DiscoverParam_Obj_isUndefined = { typeGuardKey: string; propValue: number } | undefined; // undefined
export type Type_Tmdb_TrailerParam_Obj = { typeGuardKey: string; propValue: number };
export type Type_Tmdb_SearchMovie_Obj = { typeGuardKey: string; propValue: string };

export type Type_Tmdb_BareOptParam_Union =
  | Type_Tmdb_MovieIdParam_Obj
  | Type_Tmdb_PersonIdParam_Obj
  | Type_Tmdb_DiscoverParam_Obj_isUndefined
  | Type_Tmdb_TrailerParam_Obj
  | Type_Tmdb_SearchMovie_Obj;

/** Fetcher Utility Payload Type */
export type Type_TmdbFetcher_Payload = {
  controller: AbortController;
  keyValuePairEndPoint: string | undefined;
  parametersObj?: Type_Tmdb_BareOptParam_Union | undefined;
};

/** useTmdbApi Payload's optional Parameters: independant properties act as Type Guard for dynamic URL generation */
export type Type_Tmdb_OptParamMovieId_Obj = { tmdbEndPointObj: Type_Tmdb_KeyValuePair_Obj; movie_id: Type_Tmdb_MovieIdParam_Obj };
export type Type_Tmdb_OptParamPersonId_Obj = { tmdbEndPointObj: Type_Tmdb_KeyValuePair_Obj; person_id: Type_Tmdb_PersonIdParam_Obj };
export type Type_Tmdb_OptParamDiscover_Obj = { tmdbEndPointObj: Type_Tmdb_KeyValuePair_Obj; discover: Type_Tmdb_DiscoverParam_Obj_isUndefined };
export type Type_Tmdb_OptParamTrailer_Obj = { tmdbEndPointObj: Type_Tmdb_KeyValuePair_Obj; trailer_id: Type_Tmdb_TrailerParam_Obj };
export type Type_Tmdb_OptParamSearchFunc_Obj = { tmdbEndPointObj: Type_Tmdb_KeyValuePair_Obj; search_term: Type_Tmdb_SearchMovie_Obj };

export type Type_Tmdb_OptParam_Union =
  | Type_Tmdb_OptParamMovieId_Obj
  | Type_Tmdb_OptParamPersonId_Obj
  | Type_Tmdb_OptParamDiscover_Obj
  | Type_Tmdb_OptParamTrailer_Obj
  | Type_Tmdb_OptParamSearchFunc_Obj;

/** useTmdbApi Union Payloads */
// Is either a Key-value pair object || {tmdbEndPointObj: nested left-side Key-value Pair, Custom Type Guard Param: Key-value Pair}
export type Type_Tmdb_Mixed_Union_isUndefined = Type_Tmdb_KeyValuePair_Obj | Type_Tmdb_OptParam_Union | undefined;
// Type_Tmdb_Mixed_Union_isUndefined as a singular object || an array of objects || undefined
export type Type_Tmdb_Payload_Union_isUndefined = Type_Tmdb_Mixed_Union_isUndefined | Type_Tmdb_Mixed_Union_isUndefined[] | undefined;

export type Type_Tmdb_useTmdbApiPayload = {
  controller: AbortController;
  payload: Type_Tmdb_Payload_Union_isUndefined;
};

/** Fetcher Utility Return Types */
// Resolved Promise
export type Type_Tmdb_FetcherReturn_Obj = {
  results: Type_Tmdb_ApiCall_Union[];
  dates?: { maximum: string; minimum: string };
  page?: number;
  total_pages?: number;
  total_results?: number;
};

// Promise
export type Type_Tmdb_FetcherReturn_ObjPromise_isUndefined = Promise<Type_Tmdb_FetcherReturn_Obj | undefined>;

/** useTmdbApi Return */
export type Type_Tmdb_useApiReturn_Obj_isUndefined = { key: string; label?: string | undefined; value: Type_Tmdb_ApiCall_Union[] } | undefined;

/** Data Storage Type */
export type Type_Tmdb_useApiReturn_Obj = Exclude<Type_Tmdb_useApiReturn_Obj_isUndefined, undefined>;
