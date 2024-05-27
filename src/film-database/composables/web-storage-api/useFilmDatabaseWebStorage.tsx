import { filmDatabaseKeyValuePairs } from '../../../App';
import { Type_Tmdb_Api_Union } from '../tmdb-api/types/TmdbDataTypes';

const fireCrossOriginError = (): void => console.error('Cross-Origin access to sessionStorage is not permitted.');
const fireRetrievalError = (): void => console.error('Could not retrieve data from Web Storage.');

const getParsedData = (key: string): Type_Tmdb_Api_Union[] | undefined => {
  const cachedDataString: string | null = sessionStorage.getItem(key);
  if (!cachedDataString) {
    fireRetrievalError();
    return undefined;
  }

  const parsedData: Type_Tmdb_Api_Union[] | undefined = JSON.parse(cachedDataString);

  if (parsedData) {
    return parsedData;
  } else {
    console.error('Web Storage Key is missing or undefined.');
    return undefined;
  }
};

export const useFilmDatabaseWebStorage = (userLocation: string) => {
  /** Simple Cross-Origin restriction safety protocol (utilizes project paths from custom app routing solution) */
  const isSameOrigin: boolean = filmDatabaseKeyValuePairs.some((obj) => obj.path === userLocation);

  const setData = (cacheKey: string, data: Type_Tmdb_Api_Union[]): void => {
    if (isSameOrigin) {
      sessionStorage.setItem(cacheKey, JSON.stringify(data));
    } else {
      fireCrossOriginError();
    }
  };

  const getData = (cacheKey: string): Type_Tmdb_Api_Union[] | undefined => {
    if (!isSameOrigin) {
      fireCrossOriginError();
      return undefined;
    }

    const parsedData: Type_Tmdb_Api_Union[] | undefined = getParsedData(cacheKey);

    if (parsedData) {
      return parsedData;
    } else {
      fireRetrievalError();
      return undefined;
    }
  };

  return { setData, getData };
};
