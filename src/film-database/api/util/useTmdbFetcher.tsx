import { Type_Tmdb_Call_Params, Type_Tmdb_DataFetch_Obj, Type_Tmdb_FetcherReturn_ObjPromise_isUndefined } from '../types/TmdbDataTypes';

/**
 * TMDB API Fetch
 * @param endPoint
 * @param signal
 * @param movie_id?
 * @param person_id?
 * @returns
 */

export const useTmdbFetcher = async ({
  signal,
  movie_id,
  person_id,
  tmdbEndPointKeyValuePairValue,
}: Type_Tmdb_Call_Params): Type_Tmdb_FetcherReturn_ObjPromise_isUndefined => {
  // Authorization options for TMDB API
  const options: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${import.meta.env.VITE_TMDB_AUTH_KEY}`,
    },
    signal: signal,
  };

  // Alter URL according to optional paramaters
  let url: string;

  switch (true) {
    case !!movie_id:
      url = `${tmdbEndPointKeyValuePairValue?.replace('{movie_id}', movie_id)}`;
      break;
    case !!person_id:
      url = `${tmdbEndPointKeyValuePairValue?.replace('{person_id}', person_id)}`;
      break;
    default:
      url = `${tmdbEndPointKeyValuePairValue}`;
  }

  try {
    // Fetch data
    const response: Response = await fetch(`${url}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`, options);
    const rawData: Promise<Type_Tmdb_DataFetch_Obj | undefined> = await response.json();

    // Throw status code if response is not ok, else return data
    if (!response.ok) throw new Error(`${response.status}`);
    else return rawData;

    // Catch errors
  } catch (error) {
    console.error('Request failure status: ', error);
  }
};
