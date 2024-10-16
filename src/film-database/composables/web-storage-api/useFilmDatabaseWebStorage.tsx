import { Type_Tmdb_Api_Union } from '../tmdb-api/types/TmdbDataTypes';

const fireRetrievalError = (): void => console.error('Could not retrieve data from Web Storage.');

const setData = (cacheKey: string, data: Type_Tmdb_Api_Union[]): void => sessionStorage.setItem(cacheKey, JSON.stringify(data));

const getData = (cacheKey: string): Type_Tmdb_Api_Union[] | undefined => {
  const cachedDataString: string | null = sessionStorage.getItem(cacheKey);

  if (!cachedDataString) {
    fireRetrievalError();
    return undefined;
  }

  const parsedData: Type_Tmdb_Api_Union[] | undefined = JSON.parse(cachedDataString);

  if (!parsedData) {
    console.error('Web Storage Key is missing or undefined.');
    return undefined;
  }

  return parsedData;
};

export const useFilmDatabaseWebStorage = () => {
  return { setData, getData };
};
