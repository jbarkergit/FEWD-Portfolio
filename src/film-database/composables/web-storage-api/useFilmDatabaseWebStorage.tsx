import { filmDatabaseKeyValuePairs } from '../../../App';
import { Type_Tmdb_ApiCallTrailer_Obj, Type_Tmdb_useApiReturn_Obj } from '../tmdb-api/types/TmdbDataTypes';

export type Type_useFDWebStorage_Trailer_Obj = {
  trailer_id: string | number;
  trailer: Type_Tmdb_ApiCallTrailer_Obj | undefined;
};

type Type_useFDWebStorage_setData_ArrUnion = Type_Tmdb_useApiReturn_Obj[] | Type_useFDWebStorage_Trailer_Obj[] | undefined;
type Type_useFDWebStorage_getData_Union = Type_Tmdb_useApiReturn_Obj | Type_useFDWebStorage_Trailer_Obj | undefined;

interface Type_Tmdb_useWebStorage_Interface {
  userLocation: any;
  cacheKey: string | string[];
  data?: Type_useFDWebStorage_setData_ArrUnion;
}

export const useFilmDatabaseWebStorage = ({ userLocation, cacheKey, data }: Type_Tmdb_useWebStorage_Interface) => {
  /** Errors */
  const fireCrossOriginError = (): void => console.error('Cross-Origin access to localStorage is not permitted.');
  const fireRetrievalError = (): void => console.error('Could not retrieve data from Web Storage.');

  /** Simple Cross-Origin restriction safety protocol (utilizes project paths from custom app routing solution) */
  const isSameOrigin: boolean = filmDatabaseKeyValuePairs.some((obj) => obj.path === userLocation);

  /** Data Setter */
  const setData = (): void => {
    if (isSameOrigin) {
      const handleDataCaching = (key: string, value: Type_useFDWebStorage_setData_ArrUnion): void => localStorage.setItem(key, JSON.stringify(value));

      switch (cacheKey) {
        case 'trailers':
          const trailerData = data as Type_useFDWebStorage_Trailer_Obj[];
          const cachedTrailers = getData() as Type_useFDWebStorage_Trailer_Obj[];
          const mergedData = [...(trailerData || []), ...(cachedTrailers || [])];
          handleDataCaching(cacheKey, mergedData);
          break;

        default:
          if (Array.isArray(cacheKey)) cacheKey.forEach((key) => handleDataCaching(key, data));
          else handleDataCaching(cacheKey, data);
          break;
      }
    } else {
      fireCrossOriginError();
      return;
    }
  };

  /** Data getter - Utilizes Web Storage to prevent unnecessary API calls */
  const getData = (): Type_useFDWebStorage_getData_Union[] | undefined => {
    let cachedDataArr: Type_useFDWebStorage_getData_Union[] | undefined = [];

    // Get && Parse Function
    const getParsedWebStorageKey = (key: string) => {
      const cachedDataString: string | null = localStorage.getItem(key);

      if (cachedDataString !== null) {
        const parsedData: Type_Tmdb_useApiReturn_Obj[] | Type_useFDWebStorage_Trailer_Obj[] = JSON.parse(cachedDataString);

        switch (true) {
          case parsedData.some((obj) => 'key' in obj):
            return parsedData as Type_Tmdb_useApiReturn_Obj[];

          case parsedData.some((obj) => 'trailer_id' in obj):
            return parsedData as Type_useFDWebStorage_Trailer_Obj[];

          default:
            console.error('Web Storage Key is missing or undefined.');
            return undefined;
        }
      } else {
        fireRetrievalError();
        return undefined;
      }
    };

    // Fire Get && Parse Function
    if (isSameOrigin) {
      switch (true) {
        case Array.isArray(cacheKey):
          cacheKey.forEach((key) => {
            const parsedData = getParsedWebStorageKey(key);
            if (parsedData) cachedDataArr.push(...parsedData);
          });
          break;

        case typeof cacheKey === 'string':
          const parsedData = getParsedWebStorageKey(cacheKey);
          if (parsedData) cachedDataArr.push(...parsedData);
          break;

        default:
          fireRetrievalError();
          return undefined;
      }
    } else {
      fireCrossOriginError();
      return;
    }

    return cachedDataArr;
  };

  // Return nested functions in useFilmDatabaseWebStorage scope
  return { setData, getData };
};
