import { Type_Tmdb_Movie_Keys_Union } from '../data/tmdbEndPoints';
import { Type_Tmdb_Api_Union } from '../types/TmdbDataTypes';

type Type_TmdbFetch_Response_ResolvedPromise = {
  results: Type_Tmdb_Api_Union[];
  page?: number;
  total_pages?: number;
  total_results?: number;
  dates?: { maximum: string; minimum: string };
};

type Type_TmdbFetch_Response_Promise_isUndefined = Promise<Type_TmdbFetch_Response_ResolvedPromise | undefined>;

const fetchTmdbData = async (keyValuePair: { key: Type_Tmdb_Movie_Keys_Union; endpoint: string }): Type_TmdbFetch_Response_Promise_isUndefined => {
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

    const data: Type_TmdbFetch_Response_ResolvedPromise = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const processFetch = async (keyValuePair: { key: Type_Tmdb_Movie_Keys_Union; endpoint: string }) => {
  const { key, endpoint } = keyValuePair;

  // Prevent http requests if data exists in sessionStorage
  const cachedData: string | null = sessionStorage.getItem(key);

  if (cachedData) {
    const parsedData: Type_Tmdb_Api_Union[] | undefined = JSON.parse(cachedData);
    if (parsedData !== undefined) return { key: key, results: parsedData };
  }

  // Fetch
  const data: Type_TmdbFetch_Response_ResolvedPromise | undefined = await fetchTmdbData(keyValuePair);
  if (!data) throw new Error('Http response failure.');

  // Cache and return data
  sessionStorage.setItem(key, JSON.stringify(data));
  return { key: key, results: data };
};

type Type_TmdbFetcher_Params = { key: Type_Tmdb_Movie_Keys_Union; endpoint: string } | { key: Type_Tmdb_Movie_Keys_Union; endpoint: string }[];

export const useTmdbFetcher = async (keyValuePairs: Type_TmdbFetcher_Params) => {
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
    // Prevent http requests if data exists in sessionStorage
    const cachedData = sessionStorage.getItem(keyValuePairs.key);

    if (cachedData) {
      const parsedData: Type_Tmdb_Api_Union[] | undefined = JSON.parse(cachedData);
      if (parsedData !== undefined) return { key: keyValuePairs.key, results: parsedData };
    }

    // Fetch, cache and return data
    try {
      processFetch(keyValuePairs);
    } catch (error) {
      console.error('Failure to fetch data: ', error);
    }
  }
};
