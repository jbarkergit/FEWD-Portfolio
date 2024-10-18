import { tmdbEndpoints, Type_TmdbEndpoint_Keys_Union } from '../data/tmdbEndPoints';
import { tmdbMovieGenres, Type_MovieGenre_Keys } from '../data/tmdbGenres';

/** Custom Type Naming Convention Reference
 * TMDB Api Documentation does not provide call types; therefore, manual conversion is required to build respective data structures
 *
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
 * #5. OPTIONAL: Determine if desired input/output is potentially OPTIONAL | UNKNOWN | UNDEFINED | NULL, else OMIT
 * Note: Apply to types which may be undefined: VOID union types without an undefined return
 * Note: "is" preface, in lowercase, mandatory
 *  Could be Optional => isOpt
 *  Could be Unknown -> isUnknown
 *  Could be Undefined -> isUndefined
 *  Could be Null -> isNullable
 *      e.g. Type_Tmdb_Movie_Map_isUndefined
 */

/** Fetch Utility Function */
export type Type_Tmdb_Prefabs_Obj = {
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

export type Type_Tmdb_Response_Union = Type_Tmdb_Prefabs_Obj;

const fetchTmdbData = async (keyValuePair: { key: Type_TmdbEndpoint_Keys_Union; endpoint: string }): Promise<unknown | undefined> => {
  const abortController = new AbortController();

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
const processFetch = async (keyValuePair: { key: Type_TmdbEndpoint_Keys_Union; endpoint: string }) => {
  // Prevent http requests if data exists in sessionStorage
  const cachedData: string | null = sessionStorage.getItem(keyValuePair.key);

  if (cachedData) {
    const parsedData: Type_Tmdb_Response_Union[] | undefined = JSON.parse(cachedData);
    if (parsedData !== undefined) return { [keyValuePair.key]: parsedData };
  }

  // Fetch
  const data: unknown = await fetchTmdbData(keyValuePair);
  if (!data) throw new Error('Http response failure.');

  // Cache data
  sessionStorage.setItem([keyValuePair.key] as unknown as string, JSON.stringify(data));

  // Return
  return { [keyValuePair.key]: data };
};

/** Handle callbacks and errors */
type Type_Tmdb_InitFetch_Param_Obj = { key: Type_TmdbEndpoint_Keys_Union; endpoint: string };
type Type_Tmdb_InitFetch_Params = Type_Tmdb_InitFetch_Param_Obj | Type_Tmdb_InitFetch_Param_Obj[];

const initializeFetch = async (keyValuePairs: Type_Tmdb_InitFetch_Params) => {
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
const buildEndpoint = (params: Type_Tmdb_UseTmdbFetcher_Params_Obj): Type_Tmdb_InitFetch_Param_Obj | undefined => {
  // Import API Key
  const apiKey: string = import.meta.env.VITE_TMDB_API_KEY;
  if (!apiKey) return undefined;

  // Generate array of key-value pairs from tmdbEndpoints
  const tmdbKeyEndpointArr: { [key: string]: string }[] = Object.entries(tmdbEndpoints).flatMap(([category, endpoints]) =>
    Object.entries(endpoints).map(([key, value]) => ({ [key]: value }))
  );

  // Find requested object
  const requestedData = tmdbKeyEndpointArr.find((obj) => Object.keys(obj)[0] === params.key);

  // !requestedObj ? throw error, short return : null
  if (!requestedData) {
    console.error('Failure to build endpoint: requested data not found.');
    return undefined;
  }

  // Destructure requested data
  let [_, endpoint] = Object.entries(requestedData)[0];

  // Mutate arg endpoint
  switch (true) {
    case !!params.args?.movie_id:
      endpoint = endpoint.replace('{movie_id}', `${params.args.movie_id}`) + `?api_key=${apiKey}`;
      break;
    case !!params.args?.genre:
      endpoint = endpoint
        .replace('/movie', `/movie?api_key=${apiKey}`)
        .replace('{genre_ids}', `&with_genres=${tmdbMovieGenres[params.args.genre as Type_MovieGenre_Keys]}`);
      break;
    case !!params.args?.querie:
      endpoint = endpoint + `?query=${params.args.querie}&include_adult=false&language=en-US&page=1`;
      break;
    default:
      endpoint = endpoint + `?api_key=${apiKey}`;
      break;
  }

  // Return
  return { key: params.key, endpoint: endpoint };
};

/** Initialize build of endpoints then initialize callback chain to fetch data with said endpoints */
type Type_Tmdb_UseTmdbFetcher_Params_Obj = {
  key: Type_TmdbEndpoint_Keys_Union;
  args?: Partial<{
    movie_id: number;
    genre: string;
    querie: string;
  }>;
};

export const useTmdbFetcher = async (params: Type_Tmdb_UseTmdbFetcher_Params_Obj | Type_Tmdb_UseTmdbFetcher_Params_Obj[]) => {
  // Generate endpoints
  const endpoints: Type_Tmdb_InitFetch_Param_Obj | (Type_Tmdb_InitFetch_Param_Obj | undefined)[] | undefined = Array.isArray(params)
    ? params.map((arg) => buildEndpoint(arg))
    : buildEndpoint(params);

  // Invoke initialize fetch callback chain
  if (Array.isArray(endpoints)) {
    const filteredEndpoints: Type_Tmdb_InitFetch_Param_Obj[] = endpoints.filter((obj) => obj !== undefined);
    return await initializeFetch(filteredEndpoints);
  } else {
    if (!endpoints) return undefined;
    return await initializeFetch(endpoints);
  }
};
