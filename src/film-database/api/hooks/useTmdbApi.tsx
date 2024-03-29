// Api Util
import { tmdbFetcher } from '../util/tmdbFetcher';
// Api Types
import {
  Type_Tmdb_Fetcher_Obj,
  Type_Tmdb_Invoke_Params,
  Type_Tmdb_KeyValuePair_Obj,
  Type_Tmdb_MovieList_Obj,
  Type_Tmdb_Movies_Obj,
  Type_Tmdb_ProcessorReturn_StateObj,
  Type_Tmdb_Processor_StateObj,
  Type_Tmdb_Trailer_Obj,
} from '../types/TmdbDataTypes';

/** Concurrent Fetch Operations: filtering && aborting operations
 * Utilizing an AbortController to pass signals in order to abort individual fetch operations
 * Promise.all < Promise.allSettled: Ensure that unresolved fetch returns doesn't abort all fetch operations
 * Manually filter out unresolved promises
 * Controller Param: Enables passing of signals to each operation allowing for aborts.
 */

export const useTmdbApi = async ({ controller, movie_id, person_id, tmdbKeyValuePairUnion }: Type_Tmdb_Invoke_Params): Type_Tmdb_ProcessorReturn_StateObj => {
  // Array conversion: tmdbKeyValuePairUnion parameter (Outweighs any potential performance loss from type checks)
  const tmdbKeyValuePairUnionConversion = (): Type_Tmdb_KeyValuePair_Obj[] => {
    return Array.isArray(tmdbKeyValuePairUnion) ? tmdbKeyValuePairUnion : [tmdbKeyValuePairUnion];
  };

  const entries = await Promise.allSettled(
    // Fetch array of key-value pairs asynchronously
    tmdbKeyValuePairUnionConversion().map(async (keyValuePair: Type_Tmdb_KeyValuePair_Obj) => {
      const fetchDataPromise: Type_Tmdb_Fetcher_Obj | undefined = await tmdbFetcher({
        controller: controller,
        movie_id: movie_id,
        person_id: person_id,
        keyValuePairEndPoint: keyValuePair.endPoint,
      });

      const fetchedDataResults = fetchDataPromise?.results;

      if (!fetchDataPromise || !fetchedDataResults) {
        throw new Error(`Unfulfilled fetch response for key: ${keyValuePair.key}`);
      }

      let explicitlyTypedData;

      // Type casting fetched data
      switch (true) {
        // Type_Tmdb_MovieList_Obj
        case 'backdrop_path' in fetchedDataResults:
          explicitlyTypedData = fetchedDataResults as Type_Tmdb_MovieList_Obj[];
          break;

        // Type_Tmdb_Movies_Obj
        case 'budget' in fetchedDataResults:
          explicitlyTypedData = fetchedDataResults as Type_Tmdb_Movies_Obj[];
          break;

        // Type_Tmdb_Trailer_Obj
        default:
          explicitlyTypedData = fetchedDataResults as Type_Tmdb_Trailer_Obj[];
          break;
      }

      const key: string = keyValuePair.key;
      const label: string | undefined = keyValuePair.label;

      return { key: key, label: label, value: explicitlyTypedData };
    })
  );

  // Filter out and error log rejections
  const rejections = entries.filter((entry) => entry.status === 'rejected');
  if (rejections.length > 0) throw new Error(`Rejections: ${rejections}`);

  // Return filtered data (any potential undefined or rejected values from Promise.allSettled array)
  // Unfortunately, TypeScript has an issue narrowing down types after filtering; therefore, type casting is required in the map method
  return entries
    .filter((entry: PromiseSettledResult<Type_Tmdb_Processor_StateObj>) => entry.status === 'fulfilled' && entry.value !== null)
    .map((entry: PromiseSettledResult<Type_Tmdb_Processor_StateObj>) => (entry as PromiseFulfilledResult<Type_Tmdb_Processor_StateObj>).value);
};
