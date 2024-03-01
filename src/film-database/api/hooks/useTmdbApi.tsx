// Api Types
import { Type_Tmdb_DataFetch_Obj, Type_Tmdb_ApiCallUnion_Obj, Type_Tmdb_Parent_StateObjArr, Type_Tmdb_Call_Params } from '../types/TmdbDataTypes';
// Api Util
import { tmdbProcessor } from '../util/tmdbProcessor';

export const useTmdbApi = async ({ controller, tmdbEndPointKeyValuePairArr, movie_id, person_id }: Type_Tmdb_Call_Params): Promise<Type_Tmdb_Parent_StateObjArr> => {
  // Initialize return storage
  const dataStorage: Type_Tmdb_Parent_StateObjArr = [];

  // Individualize api calls
  const fetchAndProcessApiCall = tmdbProcessor({
    controller: controller,
    tmdbEndPointKeyValuePairArr: tmdbEndPointKeyValuePairArr,
    movie_id: movie_id,
    person_id: person_id,
  });

  // Type check, destructure, resolve and store data
  await fetchAndProcessApiCall.then(async (lists) => {
    if (Array.isArray(lists)) {
      for (const list of lists) {
        if (list.status === 'fulfilled') {
          const fulfilledList = list.value;

          if (fulfilledList) {
            const key: string = fulfilledList.key;
            const value: Type_Tmdb_DataFetch_Obj = await fulfilledList.value;
            const resultsArray: Type_Tmdb_ApiCallUnion_Obj[] = value.results;
            dataStorage.push({ key: key, value: resultsArray });
          }
        }
      }
    } else console.error('Data type may be unresolved or undefined.');
  });

  return dataStorage;
};
