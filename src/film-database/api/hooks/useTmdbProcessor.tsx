// Api Hooks
import { useTmdbFetcher } from '../util/useTmdbFetcher';
// Api Types
import {
  Type_Tmdb_Call_Params,
  Type_Tmdb_FetcherReturn_ObjPromise_isUndefined,
  Type_Tmdb_ProcessorReturn_MapEntriesPromise_isUndefined,
} from '../types/TmdbDataTypes';

/**
 *
 * @param param0
 */

export const useTmdbProcessor = async ({
  tmdbEndPointKeyValuePairArr,
  signal,
  movie_id,
  person_id,
}: Type_Tmdb_Call_Params): Type_Tmdb_ProcessorReturn_MapEntriesPromise_isUndefined => {
  // Ensure the tmdbEndPointKeyValuePairArr parameter is not undefined.
  if (tmdbEndPointKeyValuePairArr) {
    try {
      // Use Promise.all to concurrently fetch data from tmdbEndPointKeyValuePairArr (array of end points)
      const mapEntries = await Promise.all(
        // Map the array of key-value pairs to process each end point asynchronously
        tmdbEndPointKeyValuePairArr.map(async (keyValuePair: { key: string; endPoint: string }) => {
          // Establish variable for fetch calls, note: optional parameters movie_id & person_id may still be passed despite being optional
          const fetchDataPromise: Type_Tmdb_FetcherReturn_ObjPromise_isUndefined = useTmdbFetcher({
            tmdbEndPointKeyValuePairValue: keyValuePair.endPoint,
            signal: signal,
            movie_id: movie_id,
            person_id: person_id,
          });

          // Ensure that both the key and fetched data are available for each operation
          if (!keyValuePair.key || !fetchDataPromise) {
            throw new Error(`Fetch call has failed. key: ${keyValuePair.key}, value: ${fetchDataPromise}`);
          }

          // Create a key-value pair to store as an entry in a new Map
          const mapEntry = { key: keyValuePair.key, value: fetchDataPromise };

          // Return our map entry if all goes well
          return mapEntry;
        })
      );

      // Return filtered (any potential undefined values from Promise.all array) data
      return mapEntries.filter((entry) => entry !== undefined);

      // Catch and log errors
    } catch (Error) {
      console.error('Data may be unreachable or undefined: ', Error);
    }
  } else {
    console.error('The API Processor can only receive Key-value pair Arrays.');
  }
};
