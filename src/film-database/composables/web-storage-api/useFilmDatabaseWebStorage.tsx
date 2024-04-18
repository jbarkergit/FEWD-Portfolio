import { filmDatabaseKeyValuePairs } from '../../../App';
import { Type_Tmdb_ApiCallTrailer_Obj, Type_Tmdb_useApiReturn_Obj } from '../../api/types/TmdbDataTypes';

export type Type_useFilmDatabaseWebStorage_Obj = {
  trailer_id: string | number;
  trailer: Type_Tmdb_ApiCallTrailer_Obj | undefined;
};

interface Type_Tmdb_useWebStorage_Interface {
  userLocation: any;
  cacheKey: 'movieCache' | 'trailerCache' | string;
  data?: Type_Tmdb_useApiReturn_Obj[] | Type_useFilmDatabaseWebStorage_Obj[];
}

export const useFilmDatabaseWebStorage = ({ userLocation, cacheKey, data }: Type_Tmdb_useWebStorage_Interface) => {
  /** Custom Cross-Origin restriction safety protocol (utilizes project paths from custom app routing solution) */
  const isSameOrigin = (): boolean => {
    return filmDatabaseKeyValuePairs.some((obj) => obj.path === `${userLocation.pathname}`);
  };

  /** Data Setter */
  const setData = (): void => {
    if (isSameOrigin()) {
      if (cacheKey === 'trailerCache') {
        const trailerData = data as Type_useFilmDatabaseWebStorage_Obj[];
        const cachedTrailers = getData() as Type_useFilmDatabaseWebStorage_Obj[];

        if (trailerData && cachedTrailers) {
          localStorage.setItem(cacheKey, JSON.stringify([...trailerData, ...cachedTrailers]));
        } else {
          localStorage.setItem(cacheKey, JSON.stringify(data));
        }
      } else {
        localStorage.setItem(cacheKey, JSON.stringify(data));
      }
    } else {
      console.error('Cross-Origin access to localStorage is not allowed.');
    }
  };

  /** Data getter - Utilizes Web Storage to prevent unnecessary API calls */
  const getData = (): Type_Tmdb_useApiReturn_Obj[] | Type_useFilmDatabaseWebStorage_Obj[] | null => {
    if (isSameOrigin()) {
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        return JSON.parse(cachedData);
      } else {
        console.error('Could not retrieve data from Web Storage.');
        return null;
      }
    } else {
      console.error('Cross-Origin access to localStorage is not allowed.');
      return null;
    }
  };

  // Return nested functions
  return { setData, getData };
};
