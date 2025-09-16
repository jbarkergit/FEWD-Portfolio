import { tmdbDiscoveryIds } from './const/tmdbDiscoveryIds';
import { tmdbEndpoints } from './const/tmdbEndpoints';
import type {
  TmdbEndpointKeys,
  TmdbNeverKeys,
  TmdbNumberKeys,
  TmdbResponse,
  TmdbStringKeys,
} from './types/TmdbResponse';

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

const excludedKeys = ['videos', 'personDetails', 'personCredits', 'credits', 'watchProviders', 'search'] as const;

const createEndpoint = <K extends TmdbEndpointKeys>(key: K, query: Query<K>): string | undefined => {
  const allEndpoints = Object.assign({}, tmdbEndpoints.never, tmdbEndpoints.number, tmdbEndpoints.string);
  const endpoint = allEndpoints[key];

  if (!endpoint) {
    console.error(`Function 'createEndpoint' failed to identify the requested key in API endpoints.`);
    return undefined;
  }

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

const callApi = async <K extends TmdbEndpointKeys>(key: K, query: Query<K>): Promise<DataReturn<K> | undefined> => {
  try {
    const controller = new AbortController();

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

    if (!response.ok) {
      controller.abort();
      throw new Error(`Function 'callApi' aborted request for ${key}`);
    }

    const result = await response.json();
    if (!excludedKeys.includes(key)) sessionStorage.setItem(key, JSON.stringify(result));
    return result as DataReturn<K>;
  } catch (e) {
    console.error(e);
  }
};

const retrieveCachedValue = <K extends TmdbEndpointKeys>(key: K): DataReturn<K> | null => {
  const entry = sessionStorage.getItem(key);
  const value = entry ? JSON.parse(entry) : null;
  if (value) return value as DataReturn<K>;
  return null;
};

const handleArg = async <K extends TmdbEndpointKeys>(
  key: K,
  query: Query<K>
): Promise<ReturnType<typeof retrieveCachedValue | typeof callApi>> => {
  if (!excludedKeys.includes(key)) {
    const cachedValue = retrieveCachedValue(key);
    if (cachedValue) return cachedValue;
  }

  return await callApi(key, query);
};

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

type CallReturn<T> = T extends any[] // If T is an array of arguments
  ? {
      [K in keyof T]: T[K] extends Arguments
        ? { key: ArgumentToKey<T[K]>; response: DataReturn<ArgumentToKey<T[K]>> }
        : never;
    }
  : { key: ArgumentToKey<T>; response: DataReturn<ArgumentToKey<T>> };

export const tmdbCall = async <T extends Arguments | Arguments[]>(args: T): Promise<CallReturn<T>> => {
  const parameters = (Array.isArray(args) ? args : [args]) as Arguments[];

  const handleBadArgument = (arg: unknown) => {
    console.error(`Failure to map promise for ${arg}`);
    return { key: arg && typeof arg === 'string' ? arg : undefined, response: undefined };
  };

  const promises = parameters.map(async (arg) => {
    if (typeof arg === 'string') {
      return { key: arg, response: await handleArg(arg, undefined) };
    } else if (arg && typeof arg === 'object') {
      const entries = Object.entries(arg)[0];
      if (entries) return { key: entries[0], response: await handleArg(entries[0] as TmdbEndpointKeys, entries[1]) };
      else handleBadArgument(arg);
    } else {
      handleBadArgument(arg);
    }
  });

  const responses = await Promise.allSettled(promises);
  const fulfilled = responses.filter((entry) => entry.status === 'fulfilled').map((f) => f.value as DataReturn<any>);
  const rejected = responses.filter((entry) => entry.status === 'rejected');

  if (rejected.length) {
    for (const rejection of rejected) {
      console.error(`Function 'tmdbCall' rejection ${rejection.reason}`);
    }
  }

  const result = Array.isArray(args) ? fulfilled : fulfilled[0];
  return result as CallReturn<T>;
};
