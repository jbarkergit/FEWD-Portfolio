// Api Util
import { tmdbFetcher } from '../util/tmdbFetcher';
// Api Types
import {
  Type_Tmdb_Discover_Obj_isUndefined,
  Type_Tmdb_Fetcher_Obj,
  Type_Tmdb_KeyValuePair_Obj,
  Type_Tmdb_Mixed_Union_isUndefined,
  Type_Tmdb_MovieId_Obj_isUndefined,
  Type_Tmdb_Payload_Union,
  Type_Tmdb_PersonId_Obj_isUndefined,
  Type_Tmdb_useApiReturn_Obj,
  Type_Tmdb_useApiReturn_Obj_isUndefined,
} from '../types/TmdbDataTypes';

/** Concurrent Fetch Operations: filtering && aborting operations
 * Utilizing an AbortController to pass signals in order to abort individual fetch operations
 * Promise.all < Promise.allSettled: Ensure that unresolved fetch returns doesn't abort all fetch operations
 * Manually filter out unresolved promises, Map new arr
 * Controller Param: Enables passing of signals to each operation allowing for aborts.
 */

export const useTmdbApi = async ({ controller, tmdbKeyValuePairUnion }: Type_Tmdb_Payload_Union): Promise<Type_Tmdb_useApiReturn_Obj[]> => {
  // Handle events where singular objects are passed by converting entries to an obj arr
  const tmdbKeyValuePairUnionArrConversion = (): (Type_Tmdb_Mixed_Union_isUndefined | undefined)[] => {
    return Array.isArray(tmdbKeyValuePairUnion) ? tmdbKeyValuePairUnion : [tmdbKeyValuePairUnion];
  };

  const entries = await Promise.allSettled(
    // Fetch array of key-value pairs asynchronously
    tmdbKeyValuePairUnionArrConversion().map(async (keyValuePair) => {
      // Utilizes Type Guard to return key-value pair's properties
      const destructureKeyValuePair = () => {
        if (keyValuePair) {
          let typedKeyValuePair;

          switch (true) {
            case 'movie_id' in keyValuePair:
              typedKeyValuePair = keyValuePair as Type_Tmdb_MovieId_Obj_isUndefined;
              return {
                key: typedKeyValuePair.tmdbEndPointObj.key,
                label: typedKeyValuePair.tmdbEndPointObj.label,
                endPoint: typedKeyValuePair.tmdbEndPointObj.endPoint,
                parameter: typedKeyValuePair.movie_id,
              };

            case 'person_id' in keyValuePair:
              typedKeyValuePair = keyValuePair as Type_Tmdb_PersonId_Obj_isUndefined;
              return {
                key: typedKeyValuePair.tmdbEndPointObj.key,
                label: typedKeyValuePair.tmdbEndPointObj.label,
                endPoint: typedKeyValuePair.tmdbEndPointObj.endPoint,
                parameter: typedKeyValuePair.person_id,
              };

            case 'discover' in keyValuePair:
              typedKeyValuePair = keyValuePair as Type_Tmdb_Discover_Obj_isUndefined;
              return {
                key: typedKeyValuePair.tmdbEndPointObj.key,
                label: typedKeyValuePair.tmdbEndPointObj.label,
                endPoint: typedKeyValuePair.tmdbEndPointObj.endPoint,
                parameter: typedKeyValuePair.discover,
              };

            default:
              typedKeyValuePair = keyValuePair as Type_Tmdb_KeyValuePair_Obj;
              return {
                key: typedKeyValuePair.key,
                label: typedKeyValuePair.label,
                endPoint: typedKeyValuePair.endPoint,
              };
          }
        } else {
          console.error(`Key-value pair cannot be processed.`);
        }
      };

      const destructuredData = destructureKeyValuePair();

      // tmdbFetcher
      const fetchDataPromise: Type_Tmdb_Fetcher_Obj | undefined = await tmdbFetcher({
        controller: controller,
        keyValuePairEndPoint: destructuredData?.endPoint,
        parameter: destructuredData?.parameter,
      });

      // Identify bad api call without leaking api key to console
      if (!fetchDataPromise || !fetchDataPromise.results) {
        console.error(`Unfulfilled fetch response for key: ${destructuredData?.key}`);
      } else {
        return { key: destructuredData?.key, label: destructuredData?.label, value: fetchDataPromise.results };
      }
    })
  );

  // TypeScript has an issue narrowing custom type && PromiseSettledResult to PromiseFulfilledResult; therefore, type casting is required
  const entriesFilter = entries.filter((entry) => (entry as PromiseSettledResult<Type_Tmdb_useApiReturn_Obj_isUndefined>).status === 'fulfilled');
  const entriesMap = entriesFilter.map((entry) => (entry as unknown as PromiseFulfilledResult<Type_Tmdb_useApiReturn_Obj>).value);
  return entriesMap;
};
