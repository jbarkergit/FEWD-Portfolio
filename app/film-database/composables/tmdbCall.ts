import { tmdbDiscoveryIds } from './const/tmdbDiscoveryIds';
import { tmdbEndpoints } from './const/tmdbEndpoints';
import type { TmdbResponse } from './types/TmdbResponse';

type TmdbNeverKeys = keyof typeof tmdbEndpoints.never;
type TmdbNumberKeys = keyof typeof tmdbEndpoints.number;
type TmdbStringKeys = keyof typeof tmdbEndpoints.string;
type TmdbEndpointKeys = TmdbNeverKeys | TmdbNumberKeys | TmdbStringKeys;

type Query<K extends TmdbEndpointKeys> = K extends TmdbNeverKeys
  ? undefined
  : K extends TmdbNumberKeys
    ? number
    : K extends TmdbStringKeys
      ? string
      : never;

type DataReturn<K> = K extends TmdbNeverKeys
  ? TmdbResponse['never'][K]
  : K extends TmdbNumberKeys
    ? TmdbResponse['number'][K]
    : K extends TmdbStringKeys
      ? TmdbResponse['string'][K]
      : never;

type ArgumentOptions<K> = K extends TmdbNeverKeys
  ? K // literal
  : K extends TmdbNumberKeys
    ? { [P in K]: number } // {key: number}
    : K extends TmdbStringKeys
      ? { [P in K]: string } // {key: string}
      : undefined;

type Arguments = {
  [K in TmdbEndpointKeys]: ArgumentOptions<K>; // Generate option for every key
}[TmdbEndpointKeys]; // Unionize

type ArgumentToKey<T> = {
  [K in TmdbEndpointKeys]: T extends ArgumentOptions<K> ? K : never; // If T is assignable to argument shape K
}[TmdbEndpointKeys]; // Unionize

type CallResponse<T> = T extends any[] // If T is an array of arguments
  ? {
      [K in keyof T]: T[K] extends Arguments
        ? { key: ArgumentToKey<T[K]>; response: DataReturn<ArgumentToKey<T[K]>> }
        : never;
    }
  : { key: ArgumentToKey<T>; response: DataReturn<ArgumentToKey<T>> };

export const excludedCacheKeys = [
  'videos',
  'personDetails',
  'personCredits',
  'credits',
  'watchProviders',
  'search',
] as const;

const allEndpoints = { ...tmdbEndpoints.never, ...tmdbEndpoints.number, ...tmdbEndpoints.string };

export const createEndpoint = <K extends TmdbEndpointKeys>(key: K, query: Query<K>): string | undefined => {
  const endpoint = allEndpoints[key];
  if (!endpoint) return undefined;

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
};

export const callApi = async <K extends TmdbEndpointKeys>(
  controller: AbortController,
  key: K,
  query: Query<K>
): Promise<DataReturn<K> | undefined> => {
  try {
    const endpoint = createEndpoint(key, query);
    if (!endpoint) return undefined;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
      },
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`Function 'callApi' aborted request for ${key}`);

    const result = await response.json();
    if (!excludedCacheKeys.includes(key)) sessionStorage.setItem(key, JSON.stringify(result));
    return result as DataReturn<K>;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const handleArg = async <K extends TmdbEndpointKeys>(
  controller: AbortController,
  key: K,
  query: Query<K>
): Promise<ReturnType<typeof callApi>> => {
  if (!excludedCacheKeys.includes(key)) {
    const item = sessionStorage.getItem(key);
    const cached = item ? JSON.parse(item) : undefined;
    if (cached) return cached as DataReturn<K>;
  }

  return await callApi(controller, key, query);
};

export const tmdbCall = async <T extends Arguments | Arguments[]>(
  controller: AbortController,
  args: T
): Promise<CallResponse<T>> => {
  const params = (Array.isArray(args) ? args : [args]) as Arguments[];

  const promises = params.map(async (arg) => {
    if (typeof arg === 'string') return { key: arg, response: await handleArg(controller, arg, undefined) };

    if (arg && typeof arg === 'object') {
      const [key, value] = Object.entries(arg)[0] as [TmdbEndpointKeys, Query<any>];
      return { key, response: await handleArg(controller, key, value) };
    }

    return { key: arg && typeof arg === 'string' ? arg : undefined, response: undefined };
  });

  const responses = await Promise.all(promises);
  const result = Array.isArray(args) ? responses : responses[0];
  return result as CallResponse<T>;
};
