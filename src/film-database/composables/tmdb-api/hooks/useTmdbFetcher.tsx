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

export const useTmdbFetcher = async (
  keyValuePairs: { key: Type_Tmdb_Movie_Keys_Union; endpoint: string } | { key: Type_Tmdb_Movie_Keys_Union; endpoint: string }[]
) => {
  if (Array.isArray(keyValuePairs)) {
    try {
      const responses = await Promise.allSettled(
        keyValuePairs.map(async (keyValuePair) => {
          const { key, endpoint } = keyValuePair;

          // Prevent http requests if data exists in sessionStorage
          const cachedData = sessionStorage.getItem(key);

          if (cachedData) {
            const parsedData: Type_Tmdb_Api_Union[] | undefined = JSON.parse(cachedData);
            return { key: key, endpoint: parsedData };
          }

          // Fetch
          const data: Type_TmdbFetch_Response_ResolvedPromise | undefined = await fetchTmdbData(keyValuePair);
          if (!data) return undefined;

          const dataResults: Type_Tmdb_Api_Union[] = data.results;
          // Cache and return data
          sessionStorage.setItem(key, JSON.stringify(dataResults));
          return dataResults;
        })
      );

      // Filter entries
      const fulfilledEntries = responses.filter((entry) => entry.status === 'fulfilled');
      // Short circuit in the event of no viable entries
      if (fulfilledEntries.length === 0) throw new Error('No entries were viable.');

      // Return mapped fulfilled entries values
      const values = fulfilledEntries.map((entry) => entry.value);
      return values as unknown as Type_Tmdb_Api_Union[];
    } catch (error) {
      console.error('Failure to fetch data: ', error);
    }
  } else {
    // Prevent http requests if data exists in sessionStorage
    const cachedData = sessionStorage.getItem(keyValuePairs.key);

    if (cachedData) {
      const parsedData: Type_Tmdb_Api_Union[] | undefined = JSON.parse(cachedData);
      return { key: keyValuePairs.key, endpoint: parsedData };
    }

    // Fetch, cache and return data
    try {
      const data: Type_TmdbFetch_Response_ResolvedPromise | undefined = await fetchTmdbData(keyValuePairs);
      if (!data) return undefined;

      const dataResults: Type_Tmdb_Api_Union[] = data.results;
      sessionStorage.setItem(keyValuePairs.key, JSON.stringify(dataResults));
      return dataResults;
    } catch (error) {
      console.error('Failure to fetch data: ', error);
    }
  }
};
