import { filmDatabaseKeyValuePairs } from '../../../App';
import { Type_Tmdb_Parent_StateObjArr } from '../../api/types/TmdbDataTypes';

export const useFilmDatabaseWebStorage = (userLocation: any, data?: Type_Tmdb_Parent_StateObjArr) => {
  /** Custom Cross-Origin restriction safety protocol (utilizes project paths from custom app routing solution) */
  const isSameOrigin = (): boolean => {
    return filmDatabaseKeyValuePairs.some((obj) => obj.path === `${userLocation.pathname}`);
  };

  /** Web Storage Key */
  const filmDatabaseStorageKey: string = 'filmDatabaseCache';

  /** Data Setter */
  const setData = (): void => {
    if (isSameOrigin()) localStorage.setItem(filmDatabaseStorageKey, JSON.stringify(data));
    else console.error('Cross-Origin access to localStorage is not allowed.');
  };

  /** Data getter - Utilizes Web Storage to prevent unnecessary API calls */
  const getData = (): Type_Tmdb_Parent_StateObjArr | null => {
    if (isSameOrigin()) {
      const cachedData = localStorage.getItem(filmDatabaseStorageKey);

      if (cachedData) {
        return JSON.parse(cachedData) as Type_Tmdb_Parent_StateObjArr;
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
