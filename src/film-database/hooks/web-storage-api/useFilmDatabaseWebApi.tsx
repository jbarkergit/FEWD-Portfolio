import { filmDatabaseKeyValuePairs } from '../../../App';
import { Type_Tmdb_Parent_StateObjArr } from '../../api/types/TmdbDataTypes';

export const useFilmDatabaseWebApi = (userLocation: any, data: Type_Tmdb_Parent_StateObjArr) => {
  // Custom Cross-Origin restriction safety protocol (utilizes project paths from custom app routing solution)
  const isSameOrigin = (): boolean => {
    if (filmDatabaseKeyValuePairs.some((obj) => obj.path === `${userLocation.pathname}`)) return true;
    else return false;
  };

  // Data setter
  const setData = (): void => {
    if (isSameOrigin()) localStorage.setItem('film-database-cache', JSON.stringify(data));
    else console.error('Cross-Origin access to localStorage is not allowed.');
  };

  // Data getter
  const getData = () => {
    if (isSameOrigin()) {
      const cachedData = localStorage.getItem('film-database-cache');

      if (cachedData) {
        return JSON.parse(cachedData);
      } else {
        console.error('Could not retrieve data from Web Storage.');
        return null;
      }

      //
    } else {
      console.error('Cross-Origin access to localStorage is not allowed.');
      return null;
    }
  };

  // Return nested functions
  return { setData, getData };
};
