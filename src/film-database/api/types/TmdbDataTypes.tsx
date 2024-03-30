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
 * * #4. Define data structure
 *  Obj, Arr, ObjArr, Map, KeyValuePair, KeyValuePairArray, ArrUnion, ObjUnion, MixedUnion, etc.
 *      e.g. Type_Tmdb_Movie_Map_#5?
 *
 * #5. OPTIONAL: Determine if desired output is potentially UNKNOWN | UNDEFINED | NULL, else OMIT
 * Note: "is" preface, in lowercase, mandatory
 *  Could be Unknown -> isUnknown
 *  Could be Undefined -> isUndefined
 *  Could be Null -> isNullable
 *      e.g. Type_Tmdb_Movie_Map_isUndefined
 */

/**
 * API CALL TYPES
 * Interface / types missing in TMDB API Docs, manual conversion required to build respective data structures
 */

export type Type_Tmdb_MovieList_Obj = {
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

export type Type_Tmdb_Movies_Obj = {
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

export type Type_Tmdb_Trailer_Obj = {
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

/** All Potential Api Call Result Types (Type_Tmdb_DataFetch_Obj.results Type Union) */
export type Type_Tmdb_ApiCallUnion_Obj = Type_Tmdb_MovieList_Obj | Type_Tmdb_Movies_Obj | Type_Tmdb_Trailer_Obj;

/** Fetcher Data Promise Return Type (No parameters required) */
export type Type_Tmdb_Fetcher_Obj = {
  results: Type_Tmdb_ApiCallUnion_Obj[];
  dates?: { maximum: string; minimum: string };
  page?: number;
  total_pages?: number;
  total_results?: number;
};

export type Type_Tmdb_FetcherReturn_ObjPromise_isUndefined = Promise<Type_Tmdb_Fetcher_Obj | undefined>;

/** PARAMETER (PAYLOAD) TYPE */
export type Type_Tmdb_KeyValuePair_Obj = { key: string; label?: string; endPoint: string };

export type Type_Tmdb_Invoke_Params = {
  controller?: AbortController;
  movie_id?: string | undefined;
  person_id?: string | undefined;
  tmdbKeyValuePairUnion: Type_Tmdb_KeyValuePair_Obj[] | Type_Tmdb_KeyValuePair_Obj;
};

/** Processor Return Type */
export type Type_Tmdb_Processor_StateObj = { key: string; label?: string | undefined; value: Type_Tmdb_ApiCallUnion_Obj[] };

export type Type_Tmdb_ProcessorReturn_StateObj = Promise<Type_Tmdb_Processor_StateObj[]>;
