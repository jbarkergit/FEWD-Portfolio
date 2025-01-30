import { Namespace_TmdbEndpointsKeys, tmdbEndpoints } from '../data/tmdbEndPoints';
import { tmdbMovieGenres, Type_MovieGenre_Keys } from '../data/tmdbGenres';

/** Custom Type Naming Convention Reference
 * TMDB API documentation does not provide call types; therefore, manual conversion is required to build the respective data structures.
 * Note: Use of underscores (_) is to offer clarity when utilizing type autocompletion.
 *
 * #1. Preface: Interface_, Type_, and Namespace_
 * This allows for separation of concerns during importation, narrowing imports solely to types.
 * Examples: Namespace_
 *
 * #2. Group Name: Identify the type origin
 * Use location-oriented and concise names that relate to the type or grouping, aligning with native thought processes.
 * Examples: Type_Tmdb_
 *
 * BREAK: If namespace, type names start here
 *
 * #3. Unique Identifier: Identify properties
 * Assign a name that strongly implies the use case of the type's properties.
 * Examples: MovieList_
 *
 * #4. Structure Identifier: Identify data structure or use case
 * Assign a data structure type to improve legibility and use of types.
 * Examples:
 * - MovieList_Obj
 * - MovieList_Union
 *
 * #5. (Optional) Extensions, Providers
 * Define if the type's sole purpose is to supply or unionize
 * * Mandatory Notice: Use the "is" preface; omit if not required.
 * Examples:
 * - MovieList_Union_isProvider
 * - MovieList_Union_isExtension
 *
 * END OF ROAD: if extension or provider, do not inherit the following rules.
 *
 * #6. (Optional) Function Use Case
 * Use this to indicate when a type is being utilized as a function parameter or return type.
 * * Mandatory Notice: Use the "as" preface; omit if not required.
 * Examples:
 * - MovieList_Obj_asFuncParameters
 * - MovieList_Obj_asFuncReturn
 *
 * #7. (Optional, Chainable) Potentially Missing: Identify if data properties are optional, unknown, could be awaited, a promise, undefined, or void.
 * * Mandatory Notice: Use the "is" preface; omit if not required.
 * Examples:
 * - MovieList_Obj_isUndefined
 * - MovieList_Obj_asFuncReturn_isVoid
 * Chain Examples:
 * - MovieList_Obj_asFuncReturn_isPromise_isUndefined
 */

export namespace Namespace_Tmdb {
  export type BaseMedia_Provider = {
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

  export type Prefabs_Obj = {
    [K in keyof typeof tmdbEndpoints.prefabs]: {
      dates: {
        maximum: string;
        minimum: string;
      };
      page: number;
      results: BaseMedia_Provider[];
      total_pages: number;
      total_results: number;
    };
  };

  export type Details_Obj = {
    details: BaseMedia_Provider & {
      belongs_to_collection: null | object;
      budget: number;
      homepage: string;
      imdb_id: string;
      origin_country: string[];
      production_companies: Array<{
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
      }>;
      production_countries: Array<{
        iso_3166_1: string;
        name: string;
      }>;
      revenue: number;
      runtime: number;
      spoken_languages: Array<{
        english_name: string;
        iso_639_1: string;
        name: string;
      }>;
      status: string;
      tagline: string;
      genres: Array<{
        id: number;
        name: string;
      }>;
    };
  };

  export type Credits_Obj = {
    credits: {
      cast: Array<{
        adult: boolean;
        cast_id: number;
        character: string;
        credit_id: string;
        gender: number;
        known_for_department: string;
        name: string;
        order: number;
        original_name: string;
        popularity: number;
        profile_path: string | null;
      }>;
      crew: Array<{
        adult: boolean;
        credit_id: string;
        department: string;
        gender: number;
        job: string;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string | null;
      }>;
      id: number;
    };
  };

  export type Videos_Obj = {
    videos: {
      id: number;
      results: Array<{
        id: string;
        iso_639_1: string;
        iso_3166_1: string;
        key: string;
        name: string;
        official: boolean;
        published_at: string;
        site: string;
        size: number;
        type: string;
      }>;
    };
  };

  type WatchProviders_Provider = {
    display_priority: number;
    logo_path: string;
    provider_id: number;
    provider_name: string;
  };
  export type WatchProviders_Obj = {
    watchProviders: {
      id: number;
      results: {
        [countryCode: string]: {
          flatrate?: WatchProviders_Provider[];
          rent?: WatchProviders_Provider[];
          buy?: WatchProviders_Provider[];
          ads?: WatchProviders_Provider[];
          link: string;
        };
      };
    };
  };

  export type Recommendations_Provider<T> = {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
  };
  export type Recommendations_Obj = {
    recommendations: Recommendations_Provider<BaseMedia_Provider>;
  };
  export type Discover_Obj = {
    discover: Recommendations_Provider<BaseMedia_Provider>;
  };
  export type Search_Obj = {
    search: Recommendations_Provider<BaseMedia_Provider>;
  };

  export type Response_Union = Prefabs_Obj | Details_Obj | Credits_Obj | Videos_Obj | WatchProviders_Obj | Recommendations_Obj | Discover_Obj | Search_Obj;
}

/** Fetch util */
const fetchTmdbData = async (keyValuePair: { key: Namespace_TmdbEndpointsKeys.Keys_Union; endpoint: string }): Promise<unknown | undefined> => {
  const abortController: AbortController = new AbortController();

  const options: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH_KEY}`,
    },
    signal: abortController.signal,
  };

  try {
    const response: Response = await fetch(`${keyValuePair.endpoint}`, options);

    if (!response.ok) {
      abortController.abort();
      throw new Error(`Controller issued abort for key: ${keyValuePair.key}. Response status: ${response.status}`);
    }

    const data: unknown = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

/** Handle fetch queue, reduce http requests by utilizing sessionStorage */
const processFetch = async (keyValuePair: { key: Namespace_TmdbEndpointsKeys.Keys_Union; endpoint: string }) => {
  // Prevent http requests if data exists in sessionStorage
  const cachedData: string | null = sessionStorage.getItem(keyValuePair.key);

  if (cachedData) {
    const parsedData: Namespace_Tmdb.Response_Union[] | undefined = JSON.parse(cachedData);
    if (parsedData !== undefined) return { [keyValuePair.key]: parsedData };
  }

  // Fetch
  const data: unknown = await fetchTmdbData(keyValuePair);
  if (!data) throw new Error('Http response failure.');

  // Cache data
  if ([...Object.keys(tmdbEndpoints.prefabs), ...Object.keys(tmdbMovieGenres)].includes(keyValuePair.key))
    sessionStorage.setItem([keyValuePair.key] as unknown as string, JSON.stringify(data));

  // Return
  return { [keyValuePair.key]: data };
};

/** Handle callbacks and errors */
type Type_Tmdb_InitFetch_Obj = { key: Namespace_TmdbEndpointsKeys.Keys_Union; endpoint: string };
type Type_Tmdb_InitFetch_asFuncParams = Type_Tmdb_InitFetch_Obj | Type_Tmdb_InitFetch_Obj[];

const initializeFetch = async (keyValuePairs: Type_Tmdb_InitFetch_asFuncParams) => {
  if (Array.isArray(keyValuePairs)) {
    try {
      const responses = await Promise.allSettled(keyValuePairs.map(async (keyValuePair) => processFetch(keyValuePair)));
      // Filter entries
      const fulfilledEntries = responses.filter((entry) => entry.status === 'fulfilled');
      // Short circuit in the event of no viable entries
      if (fulfilledEntries.length === 0) throw new Error('No entries were viable.');
      // Return mapped fulfilled entries values
      const values = fulfilledEntries.map((entry) => entry.value);
      return values;
    } catch (error) {
      console.error('Failure at fetch.', error);
    }
  } else {
    try {
      return processFetch(keyValuePairs);
    } catch (error) {
      console.error('Failure to fetch data: ', error);
    }
  }
};

/** Endpoint builder */
const buildEndpoint = (params: Type_Tmdb_useTmdbFetcher_asFuncParams): Type_Tmdb_InitFetch_Obj | undefined => {
  // Import API Key
  const apiKey: string = import.meta.env.VITE_TMDB_API_KEY;
  if (!apiKey) return undefined;

  // Generate array of key-value pairs from tmdbEndpoints
  const tmdbKeyEndpointArr: { [key: string]: string }[] = Object.entries(tmdbEndpoints).flatMap(([category, endpoints]) =>
    Object.entries(endpoints).map(([key, value]) => ({ [key]: value }))
  );

  // Find requested object
  const requestedData = tmdbKeyEndpointArr.find((obj) => Object.keys(obj)[0] === Object.keys(params)[0]);

  // !requestedObj ? throw error, short return : null
  if (!requestedData) {
    console.error('Failure to build endpoint: requested data not found.');
    return undefined;
  }

  // Destructure requested data
  let [key, endpoint] = Object.entries(requestedData)[0];

  // Mutate arg endpoint
  const endpointPrefabKeys: string[] = Object.keys(tmdbEndpoints.prefabs);
  const endpointMovieIdKeys: string[] = Object.keys(tmdbEndpoints.movieId);

  switch (true) {
    case endpointPrefabKeys.includes(key):
      endpoint = endpoint + `?api_key=${apiKey}`;
      break;

    case endpointMovieIdKeys.includes(key):
      endpoint = endpoint.replace('{movie_id}', `${Object.values(params)[0]}`) + `?api_key=${apiKey}`;
      break;

    case key === 'discover':
      key = Object.entries(params)[0][1];
      endpoint = endpoint.replace('/movie', `/movie?api_key=${apiKey}`) + `${tmdbMovieGenres[Object.values(params)[0] as unknown as Type_MovieGenre_Keys]}`;
      break;

    case key === 'search':
      endpoint = endpoint.replace('/movie', `/movie?api_key=${apiKey}`).replace('{search_term}', params as unknown as string);
      break;

    default:
      break;
  }

  // Return
  return { key: key as Namespace_TmdbEndpointsKeys.Keys_Union, endpoint: endpoint };
};

/** Initialize build of endpoints then initialize callback chain to fetch data with said endpoints */
type Type_Tmdb_useTmdbFetcher_asFuncParams = Partial<
  {
    [K in keyof typeof tmdbEndpoints.prefabs]: never;
  } & {
    [K in keyof typeof tmdbEndpoints.movieId]: number;
  } & {
    discover: Type_MovieGenre_Keys;
    search: string;
  }
>;

export const useTmdbFetcher = async (params: Type_Tmdb_useTmdbFetcher_asFuncParams | Type_Tmdb_useTmdbFetcher_asFuncParams[]) => {
  // Generate endpoints
  const endpoints: Type_Tmdb_InitFetch_Obj | (Type_Tmdb_InitFetch_Obj | undefined)[] | undefined = Array.isArray(params)
    ? params.map((arg) => buildEndpoint(arg))
    : buildEndpoint(params);

  // Invoke initialize fetch callback chain
  if (Array.isArray(endpoints)) {
    const filteredEndpoints: Type_Tmdb_InitFetch_Obj[] = endpoints.filter((obj) => obj !== undefined);
    return await initializeFetch(filteredEndpoints);
  } else {
    if (!endpoints) return undefined;
    return await initializeFetch(endpoints);
  }
};
