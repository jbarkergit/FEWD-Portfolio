// Api Util
import { tmdbFetcher } from './tmdbFetcher';
// Api Types
import {
  Type_Tmdb_Call_Params,
  Type_Tmdb_FetcherReturn_ObjPromise_isUndefined,
  Type_Tmdb_ProcessorDefined_ObjPromise,
  Type_Tmdb_ProcessorReturn_MapSettled_isUndefined,
} from '../types/TmdbDataTypes';

export const tmdbProcessor = async ({
  controller,
  tmdbEndPointKeyValuePairArr,
  movie_id,
  person_id,
  time_window,
}: Type_Tmdb_Call_Params): Type_Tmdb_ProcessorReturn_MapSettled_isUndefined => {
  // Ensure the tmdbEndPointKeyValuePairArr parameter is not undefined
  if (tmdbEndPointKeyValuePairArr) {
    // Array conversion for tmdbEndPointKeyValuePair parameter (in the event that objects are passed for the tmdbEndPointKeyValuePairArr parameter)
    const tmdbEndPointKeyValuePairArrConversion = (): {
      key: string;
      endPoint: string;
    }[] => {
      return Array.isArray(tmdbEndPointKeyValuePairArr) ? tmdbEndPointKeyValuePairArr : [tmdbEndPointKeyValuePairArr];
    };

    // Concurrently fetch data from tmdbEndPointKeyValuePairArr (array of end points)
    try {
      const mapEntries = await Promise.allSettled(
        // Map the array of key-value pairs to process each end point asynchronously
        tmdbEndPointKeyValuePairArrConversion().map(async (keyValuePair: { key: string; endPoint: string }) => {
          // Local storage caching to prevent unnecessary api calls
          // Establish variable for fetch calls, note: optional parameters movie_id & person_id may still be passed despite being optional
          const fetchDataPromise: Type_Tmdb_FetcherReturn_ObjPromise_isUndefined = tmdbFetcher({
            controller,
            tmdbEndPointKeyValuePairValue: keyValuePair.endPoint,
            movie_id: movie_id,
            person_id: person_id,
            time_window: time_window,
          });

          // Ensure that both the key and fetched data are available for each operation
          if (!keyValuePair.key || !fetchDataPromise) {
            throw new Error(`The following request could not be fulfilled: key: ${keyValuePair.key}, value: ${fetchDataPromise}`);
          } else {
            // Create a key-value pair to store as an entry in a new Map
            const mapEntry = { key: keyValuePair.key, value: fetchDataPromise as Type_Tmdb_ProcessorDefined_ObjPromise };
            // Return our map entry if all goes well
            return mapEntry;
          }
        })
      );

      // Filter out and error log rejections
      const rejections = mapEntries.filter((entry) => entry.status === 'rejected');
      if (rejections.length > 0) throw new Error(`Rejections: ${rejections}`);

      // Return filtered data (any potential undefined or rejected values from Promise.allSettled array)
      return mapEntries.filter((entry) => entry.status === 'fulfilled');

      // Catch and log errors
    } catch (Error) {
      console.error('Data may be unreachable or undefined: ', Error);
    }
    //
  } else {
    console.error('The API processor can only receive key-value pair arrays.');
  }
};
