import { tmdbDiscoveryIds } from './const/tmdbDiscoveryIds';
import { tmdbEndpoints } from './const/tmdbEndpoints';
import type { TmdbResponse } from './types/TmdbResponse';

type NeverKeys = keyof typeof tmdbEndpoints.never;
type NumberKeys = keyof typeof tmdbEndpoints.number;
type StringKeys = keyof typeof tmdbEndpoints.string;
type EndpointKeys = NeverKeys | NumberKeys | StringKeys;

type Query<K extends EndpointKeys> = K extends NeverKeys
  ? undefined
  : K extends NumberKeys
    ? number
    : K extends StringKeys
      ? string
      : never;

type DataReturn<K> = K extends NeverKeys
  ? TmdbResponse['never']
  : K extends NumberKeys
    ? TmdbResponse['number'][K]
    : K extends StringKeys
      ? TmdbResponse['string'][K]
      : undefined;

const createEndpoint = <K extends EndpointKeys>(key: K, query: Query<K>): string | undefined => {
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

const callApi = async <K extends EndpointKeys>(key: K, query: Query<K>): Promise<DataReturn<K> | undefined> => {
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
    sessionStorage.setItem(key, JSON.stringify(result));
    return result as DataReturn<K>;
  } catch (e) {
    console.error(e);
  }
};

const retrieveCachedValue = <K extends EndpointKeys>(key: K): DataReturn<K> | null => {
  const entry = sessionStorage.getItem(key);
  const value = entry ? JSON.parse(entry) : null;
  if (value) return value as DataReturn<K>;
  return null;
};

const handleArg = async <K extends EndpointKeys>(
  key: K,
  query: Query<K>
): Promise<ReturnType<typeof retrieveCachedValue | typeof callApi>> => {
  const cachedValue = retrieveCachedValue(key);
  if (cachedValue) return cachedValue;
  return await callApi(key, query);
};

type OptionMap<K> = K extends NeverKeys
  ? K // literal
  : K extends NumberKeys
    ? { [P in K]: number } // {key: number}
    : K extends StringKeys
      ? { [P in K]: string } // {key: string}
      : undefined;

type Options = {
  [K in EndpointKeys]: OptionMap<K>; // Generate option for every key
}[EndpointKeys]; // Unionize

type InferKey<T> = {
  [K in EndpointKeys]: T extends OptionMap<K> ? K : never; // If T is assignable to argument shape K
}[EndpointKeys]; // Unionize

type TmdbCallReturn<T extends Options> = T extends any[]
  ? Array<DataReturn<InferKey<T[number]>>>
  : [DataReturn<InferKey<T>>];

export const tmdbCall = async <T extends Options>(args: T | T[]): Promise<TmdbCallReturn<T>> => {
  const parameters = Array.isArray(args) ? args : [args];

  const promises = parameters.map((arg) => {
    if (typeof arg === 'string') {
      return handleArg(arg, undefined);
    } else if (typeof arg === 'object') {
      const [key, query] = Object.entries(arg)[0] as [InferKey<typeof arg>, Query<InferKey<typeof arg>>];
      return handleArg(key, query);
    } else {
      console.error(`Function 'tmdbCall' received invalid argument: ${arg}`);
      return Promise.resolve(undefined);
    }
  });

  const responses = await Promise.allSettled(promises);
  const fulfilled = responses.filter((entry) => entry.status === 'fulfilled');
  const rejected = responses.filter((entry) => entry.status === 'rejected');

  if (rejected.length > 0)
    rejected.forEach((rejection) => console.error(`Function 'tmdbCall' rejection ${rejection.reason}`));

  const values = fulfilled.map((entry) => entry.value as DataReturn<any>);
  return Array.isArray(args) ? (values as TmdbCallReturn<T>) : ([values[0]] as TmdbCallReturn<T>);
};
