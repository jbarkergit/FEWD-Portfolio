import {
  Type_Tmdb_useTmdbApiPayload,
  Type_Tmdb_useApiReturn_Obj,
  Type_Tmdb_Mixed_Union_isUndefined,
  Type_Tmdb_OptParamMovieId_Obj,
  Type_Tmdb_OptParamPersonId_Obj,
  Type_Tmdb_OptParamDiscover_Obj,
  Type_Tmdb_OptParamTrailer_Obj,
  Type_Tmdb_OptParamSearchFunc_Obj,
  Type_Tmdb_KeyValuePair_Obj,
  Type_Tmdb_FetcherReturn_Obj,
  Type_Tmdb_useApiReturn_Obj_isUndefined,
} from '../types/TmdbDataTypes';
import { tmdbFetcher } from '../util/tmdbFetcher';

/** Concurrent Fetch Operations: filtering && aborting operations
 * Utilizing an AbortController to pass signals in order to abort individual fetch operations
 * Promise.all < Promise.allSettled: Ensure that unresolved fetch returns doesn't abort all fetch operations
 * Manually filter out unresolved promises, Map new arr
 * Controller Param: Enables passing of signals to each operation allowing for aborts.
 */

export const useTmdbApi = async ({ controller, payload }: Type_Tmdb_useTmdbApiPayload): Promise<Type_Tmdb_useApiReturn_Obj[]> => {
  // Handle events where singular objects are passed by converting entries to an obj arr
  const payloadArrConversion = (): (Type_Tmdb_Mixed_Union_isUndefined | undefined)[] => {
    return Array.isArray(payload) ? payload : [payload];
  };

  const entries = await Promise.allSettled(
    // Fetch array of key-value pairs asynchronously
    payloadArrConversion().map(async (keyValuePair: Type_Tmdb_Mixed_Union_isUndefined | undefined) => {
      // Utilizes Type Guard to return key-value pair's properties
      const destructureKeyValuePair = () => {
        if (keyValuePair) {
          let typedKeyValuePair: Type_Tmdb_Mixed_Union_isUndefined;

          switch (true) {
            case 'movie_id' in keyValuePair:
              typedKeyValuePair = keyValuePair as Type_Tmdb_OptParamMovieId_Obj;
              return {
                key: typedKeyValuePair.tmdbEndPointObj.key,
                label: typedKeyValuePair.tmdbEndPointObj.label,
                endPoint: typedKeyValuePair.tmdbEndPointObj.endPoint,
                parameter: typedKeyValuePair.movie_id,
              };

            case 'person_id' in keyValuePair:
              typedKeyValuePair = keyValuePair as Type_Tmdb_OptParamPersonId_Obj;
              return {
                key: typedKeyValuePair.tmdbEndPointObj.key,
                label: typedKeyValuePair.tmdbEndPointObj.label,
                endPoint: typedKeyValuePair.tmdbEndPointObj.endPoint,
                parameter: typedKeyValuePair.person_id,
              };

            case 'discover' in keyValuePair:
              typedKeyValuePair = keyValuePair as Type_Tmdb_OptParamDiscover_Obj;
              return {
                key: typedKeyValuePair.tmdbEndPointObj.key,
                label: typedKeyValuePair.tmdbEndPointObj.label,
                endPoint: typedKeyValuePair.tmdbEndPointObj.endPoint,
                parameter: typedKeyValuePair.discover,
              };

            case 'trailer_id' in keyValuePair:
              typedKeyValuePair = keyValuePair as Type_Tmdb_OptParamTrailer_Obj;
              return {
                key: typedKeyValuePair.tmdbEndPointObj.key,
                label: typedKeyValuePair.tmdbEndPointObj.label,
                endPoint: typedKeyValuePair.tmdbEndPointObj.endPoint,
                parameter: typedKeyValuePair.trailer_id,
              };

            case 'search_term' in keyValuePair:
              typedKeyValuePair = keyValuePair as Type_Tmdb_OptParamSearchFunc_Obj;
              return {
                key: typedKeyValuePair.tmdbEndPointObj.key,
                label: undefined,
                endPoint: typedKeyValuePair.tmdbEndPointObj.endPoint,
                parameter: typedKeyValuePair.search_term,
              };

            default:
              typedKeyValuePair = keyValuePair as Type_Tmdb_KeyValuePair_Obj;
              return {
                key: typedKeyValuePair.key,
                label: typedKeyValuePair.label,
                endPoint: typedKeyValuePair.endPoint,
                parameter: undefined,
              };
          }
        } else {
          console.error(`Key-value pair cannot be processed.`);
        }
      };

      const destructuredData = destructureKeyValuePair();

      // tmdbFetcher
      const fetchDataPromise: Type_Tmdb_FetcherReturn_Obj | undefined = await tmdbFetcher({
        controller: controller,
        keyValuePairEndPoint: destructuredData?.endPoint,
        parametersObj: destructuredData?.parameter,
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
