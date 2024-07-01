import { Type_Tmdb_Api_Union } from '../types/TmdbDataTypes';
import { fetchTmdbResponse } from '../util/fetchTmdbResponse';

/** Invoke fetcher util, filter fulfilled && rejected entries, return fulfilled data as a new arr */
export const useFetchTmdbResponse = async (keyEndpointPairArr: { key: string; endpoint: string | Type_Tmdb_Api_Union[] }[]) => {
  try {
    const fetchEntries = await Promise.allSettled(
      keyEndpointPairArr.map(async (keyEndpointPair) => {
        // Prevent unnecessary api calls(keyEndpointPair): Fetch data if keyEndpointPair is of type 'string', not Type_Tmdb_Api_Union[]
        if (typeof keyEndpointPair.endpoint === 'string') {
          const fetchResponse = await fetchTmdbResponse(keyEndpointPair as { key: string; endpoint: string });
          return { key: keyEndpointPair.key, endpoint: fetchResponse ? fetchResponse.results : keyEndpointPair.endpoint };
        } else {
          return keyEndpointPair;
        }
      })
    );

    /** NOTE
     * While handling !response.ok in fetchTmdbResponse is sufficient,
     * filtering entries based on their status (fulfilled/rejected) adds an extra layer of safety to Promise.allSettled().
     */
    const fulfilledEntries = fetchEntries.filter((entry) => entry.status === 'fulfilled');
    const rejectedEntries = fetchEntries.filter((entry) => entry.status === 'rejected');

    if (fulfilledEntries.length === 0) throw new Error('No entries were viable.');
    if (rejectedEntries.length > 0) throw new Error('Some entries were rejected.');

    //@ts-ignore (narrowing issues, not going to memory cache/type cast two variables to avoid it)
    const values = fulfilledEntries.map((entry) => entry.value);
    return values as { key: string; endpoint: Type_Tmdb_Api_Union[] }[];

    /** Catch errors */
  } catch (error) {
    console.error('Failure at entries processing:', error);
  }
};
