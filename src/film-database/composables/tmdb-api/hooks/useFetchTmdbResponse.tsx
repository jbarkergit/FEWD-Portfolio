import { Type_Tmdb_Api_Union } from '../types/TmdbDataTypes';
import { fetchTmdbResponse } from '../util/fetchTmdbResponse';

export type Type_useFetchTmdbResponse_KeyValuePairArr = [string, Type_Tmdb_Api_Union[]][];

/** Invoke fetcher util, filter fulfilled && rejected entries, return fulfilled data as a new arr */
export const useFetchTmdbResponse = async (
  keyEndpointPairArr: [key: string, value: string][],
  opt_movie_id?: number
): Promise<Type_useFetchTmdbResponse_KeyValuePairArr | undefined> => {
  try {
    const fetchEntries = await Promise.allSettled(
      keyEndpointPairArr.map(async (keyEndpointPair) => {
        const fetchResponse = await fetchTmdbResponse(keyEndpointPair, opt_movie_id);

        switch (true) {
          case !keyEndpointPair[0]:
            throw new Error('Key is unresponsive.');

          case !fetchResponse:
            throw new Error('Fetch response is unresponsive.');

          default:
            return [keyEndpointPair[0], fetchResponse.results];
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
    const values: Type_useFetchTmdbResponse_KeyValuePairArr = fulfilledEntries.map((entry) => entry.value);
    return values;

    /** Catch errors */
  } catch (error) {
    console.error('Failure at entries processing:', error);
  }
};
