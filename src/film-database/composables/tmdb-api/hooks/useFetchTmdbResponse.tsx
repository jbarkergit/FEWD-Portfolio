import { Type_Tmdb_Api_Union } from '../types/TmdbDataTypes';
import { fetchTmdbResponse } from '../util/fetchTmdbResponse';

/** Invoke fetcher util, filter fulfilled && rejected entries, return fulfilled data as a new arr */
export const useFetchTmdbResponse = async (keyValuePairs: { [key: string]: string } | { [key: string]: string }[]) => {
  if (Array.isArray(keyValuePairs)) {
    try {
      const responses = await Promise.allSettled(
        keyValuePairs.map(async (keyValuePair) => {
          const fetch = await fetchTmdbResponse(keyValuePair);
          return fetch;
        })
      );

      // Filtering entries based on their status (fulfilled/rejected) adds an extra layer of safety to Promise.allSettled().
      const fulfilledEntries = responses.filter((entry) => entry.status === 'fulfilled');
      const rejectedEntries = responses.filter((entry) => entry.status === 'rejected');

      if (fulfilledEntries.length === 0) throw new Error('No entries were viable.');
      if (rejectedEntries.length > 0) throw new Error('Some entries were rejected.');

      const values = fulfilledEntries.map((entry) => entry.value?.results);
      return values as unknown as Type_Tmdb_Api_Union[];
    } catch (error) {
      console.error('Failure at entries processing:', error);
    }
  } else {
    const fetch = await fetchTmdbResponse(keyValuePairs);
    return fetch?.results as unknown as Type_Tmdb_Api_Union;
  }
};

// Cross-origin safety layer
// const pathname: string = useLocation().pathname;

// Prevent http requests if data exists in sessionStorage
// const sessionSafeKeyValuePairs = keyValuePairs.map((entry) => {
//   console.log(Object.values(entry));
//   const getCachedDataByKey: Type_Tmdb_Api_Union[] | undefined = useFilmDatabaseWebStorage(pathname).getData(Object.entries(entry));
//   const isKeyCached: boolean = !!getCachedDataByKey;

//   if (getCachedDataByKey && isKeyCached) {
//     return { key: entry.key, endpoint: getCachedDataByKey };
//   } else {
//     return entry;
//   }
// });

// Prevent unnecessary api calls(session storage safeguard)
// data.forEach((entry) => useFilmDatabaseWebStorage(pathname).setData(entry.key, entry.endpoint));
