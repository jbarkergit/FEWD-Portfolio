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

      const values = fulfilledEntries.map((entry) => entry.value);
      return values;
    } catch (error) {
      console.error('Failure at entries processing:', error);
    }
  } else {
    return fetchTmdbResponse(keyValuePairs);
  }
};
