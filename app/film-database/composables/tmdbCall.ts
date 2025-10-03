import { tmdbDiscoveryIds } from '~/film-database/composables/const/tmdbDiscoveryIds';
import { tmdbEndpoints } from '~/film-database/composables/const/tmdbEndpoints';
import type { TmdbResponseFlat } from '~/film-database/composables/types/TmdbResponse';

// Group keys by nest properties 'never', 'number', 'string' to isolate argument shape
type TmdbNeverKeys = keyof typeof tmdbEndpoints.never;
type TmdbNumberKeys = keyof typeof tmdbEndpoints.number;
type TmdbStringKeys = keyof typeof tmdbEndpoints.string;

// Isolate argument shapes
type ArgumentShapes<K> = K extends TmdbNeverKeys
  ? K // Literal
  : K extends TmdbNumberKeys
    ? { [P in K]: number } // All Number endpoints mapped to { key: number }
    : K extends TmdbStringKeys
      ? { [P in K]: string } // All String endpoints apped to { key: string }
      : undefined;

// Unionize as arguments
type Argument = { [K in keyof TmdbResponseFlat]: ArgumentShapes<K> }[keyof TmdbResponseFlat];

// Identify key from argument
type ArgumentToKey<T> = T extends keyof TmdbResponseFlat
  ? T
  : T extends { [K in keyof TmdbResponseFlat]?: any }
    ? Extract<keyof T, keyof TmdbResponseFlat>
    : never;

// Shape response
type CallResponse<T> = T extends any[] // If T is an array of arguments
  ? {
      [K in keyof T]: T[K] extends Argument
        ? { key: ArgumentToKey<T[K]>; response: TmdbResponseFlat[ArgumentToKey<T[K]>] }
        : never;
    }
  : { key: ArgumentToKey<T>; response: TmdbResponseFlat[ArgumentToKey<T>] };

// Denest endpoints
const endpoints = { ...tmdbEndpoints.never, ...tmdbEndpoints.number, ...tmdbEndpoints.string } as const;

function buildEndpoint(keyQuery: { key: keyof TmdbResponseFlat; query: number | string | undefined }): string {
  // Destructure
  const { key, query } = keyQuery;

  // Identify endpoint
  const endpoint = endpoints[key];

  // Mutate and return endpoint
  switch (typeof query) {
    case 'number':
      return endpoint.replace('{movie_id}', query.toString());

    case 'string':
      if (endpoint.includes('{genre_id}')) {
        const genreId = tmdbDiscoveryIds[query as keyof typeof tmdbDiscoveryIds];
        return endpoint.replace('{genre_id}', genreId?.toString() ?? '');
      } else {
        return endpoint.replace('{search_term}', query);
      }

    default:
      return endpoint;
  }
}

// Array of keys we do not want to cache
const excludedCacheKeys = ['videos', 'personDetails', 'personCredits', 'credits', 'watchProviders', 'search'] as const;

async function callApi(
  controller: AbortController,
  keyQuery: {
    key: keyof TmdbResponseFlat;
    query: number | string | undefined;
  }
): Promise<unknown | undefined> {
  // Destructure
  const { key, query } = keyQuery;

  // Build endpoint
  const endpoint = buildEndpoint(keyQuery);

  // Fetch
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Aborted request for ${key}`);
    }

    const result = await response.json();

    // Cache keys not found in excludedCacheKeys array
    if (!excludedCacheKeys.includes(key)) {
      sessionStorage.setItem(key, JSON.stringify(result));
    }

    return result;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

async function processArgument(controller: AbortController, arg: Argument): Promise<unknown> {
  // Assignment
  let keyQuery: { key: keyof TmdbResponseFlat; query: number | string | undefined };

  if (typeof arg === 'string') {
    keyQuery = { key: arg, query: undefined };
  } else if (typeof arg === 'object') {
    const [key, query] = Object.entries(arg)[0] as [TmdbNumberKeys, number] | [TmdbStringKeys, string];
    keyQuery = { key: key, query: query };
  } else {
    keyQuery = { key: arg, query: undefined };
  }

  // Identify if the request is cached
  const item = sessionStorage.getItem(keyQuery.key);
  // If cached, return cached, else await fetch
  const data = item ? JSON.parse(item) : { key: keyQuery.key, response: await callApi(controller, keyQuery) };

  // Return cached item or fetch response
  return data;
}

function isFulfilled<T>(result: PromiseSettledResult<T>): result is PromiseFulfilledResult<T> {
  return result.status === 'fulfilled';
}

export async function tmdbCall<T extends Argument | Argument[]>(
  controller: AbortController,
  args: T
): Promise<CallResponse<T>> {
  // Simplify argument mapping
  const parameters = Array.isArray(args) ? args : [args];

  // Map arguments into a callback returning an object array for hand-off to Promise.allSettled
  const promises = (parameters as Argument[]).map(async (param) => await processArgument(controller, param));

  // Await allSettled
  const responses = await Promise.allSettled(promises);

  // Filter out rejected while narrowing type from PromiseSettledResult to PromiseFulfilledResult then create a new array of values
  const fulfilled = responses.filter(isFulfilled).map((f) => f.value);

  // If argument is an array, return, else if argument is a single string or object, return the data at index 0
  const result = Array.isArray(args) ? fulfilled : fulfilled[0];

  // Return type narrowed fulfilled responses
  return result as CallResponse<T>;
}

async function test() {
  const controller = new AbortController();
  const x = await tmdbCall(controller, 'now_playing');
  const y = await tmdbCall(controller, { credits: 999 });
  const z = await tmdbCall(controller, ['now_playing', { credits: 999 }]);
}
