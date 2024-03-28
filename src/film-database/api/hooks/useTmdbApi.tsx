// Api Types
import {
  Type_Tmdb_DataFetch_Obj,
  Type_Tmdb_ApiCallUnion_Obj,
  Type_Tmdb_Parent_StateObjArr,
  Type_Tmdb_Call_Params,
  Type_Tmdb_Trailer_Obj,
} from '../types/TmdbDataTypes';
// Api Util
import { tmdbProcessor } from '../util/tmdbProcessor';

export const useTmdbApi = async ({
  controller,
  tmdbEndPointKeyValuePairArr,
  movie_id,
  person_id,
  time_window,
}: Type_Tmdb_Call_Params): Promise<Type_Tmdb_Parent_StateObjArr | Type_Tmdb_Trailer_Obj[]> => {
  // Initialize return storage
  const dataStorage: Type_Tmdb_Parent_StateObjArr = [];

  // Individualize api calls
  const fetchAndProcessApiCall = tmdbProcessor({
    controller: controller,
    tmdbEndPointKeyValuePairArr: tmdbEndPointKeyValuePairArr,
    movie_id: movie_id,
    person_id: person_id,
    time_window: time_window,
  });

  // Type check, destructure, resolve and store data
  await fetchAndProcessApiCall.then(async (data) => {
    if (data) {
      if (Array.isArray(data)) {
        for (const list of data) {
          if (list.status === 'fulfilled') {
            const fulfilledList = list.value;

            if (fulfilledList) {
              const value: Type_Tmdb_DataFetch_Obj | Type_Tmdb_ApiCallUnion_Obj = await fulfilledList.value;

              const key: string = fulfilledList.key;
              const resultsArray = value.results as Type_Tmdb_ApiCallUnion_Obj[];
              const resultObject = value as unknown as Type_Tmdb_ApiCallUnion_Obj;

              dataStorage.push({ key: key, value: 'results' in value ? resultsArray : resultObject });
            }
          }
        }
        // Type_Tmdb_Trailer_Obj
      } else if ('published_at' in data) {
        return data as Type_Tmdb_Trailer_Obj[];
      } else console.error('Data type may be unresolved or undefined.');
    }
  });

  return dataStorage;
};
