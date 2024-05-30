import { Type_Tmdb_Movie_Keys_Union } from '../data/tmdbEndPoints';
import { Type_Tmdb_Api_Union } from '../types/TmdbDataTypes';
import { fetchTmdbResponse } from '../util/fetchTmdbResponse';

export type Type_useFetchTmdbResponse_KeyValuePairArr = [string, Type_Tmdb_Api_Union[]][];

/** Invoke fetcher util, filter fulfilled && rejected entries, return fulfilled data as a new arr */
export const useFetchTmdbResponse = async (
  keyEndpointPairArr: [Type_Tmdb_Movie_Keys_Union, string | Type_Tmdb_Api_Union[]][],
  opt_movie_id?: number
): Promise<Type_useFetchTmdbResponse_KeyValuePairArr | undefined> => {
  try {
    const fetchEntries = await Promise.allSettled(
      keyEndpointPairArr.map(async (keyEndpointPair) => {
        // Prevent unnecessary api calls(keyEndpointPair): Fetch data if keyEndpointPair is of type 'string', not Type_Tmdb_Api_Union[]
        if (typeof keyEndpointPair[1] === 'string') {
          const fetchResponse = await fetchTmdbResponse(keyEndpointPair as [Type_Tmdb_Movie_Keys_Union, string], opt_movie_id);

          // Switch for legibility
          switch (true) {
            case !fetchResponse:
              throw new Error('Fetch request unresponsive.');

            default:
              return [keyEndpointPair[0], fetchResponse.results];
          }
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
    const values: Type_useFetchTmdbResponse_KeyValuePairArr = fulfilledEntries.map((entry) => entry.value);
    return values;

    /** Catch errors */
  } catch (error) {
    console.error('Failure at entries processing:', error);
  }
};
