import { Type_Tmdb_Call_Params, Type_Tmdb_FetcherReturn_ObjPromise_isUndefined } from '../types/TmdbDataTypes';

export const tmdbFetcher = async ({
  controller,
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
    signal: controller?.signal,
  };

  // Alter URL according to optional paramaters
  let url: string;

  switch (true) {
    case !!movie_id:
      url = `${tmdbEndPointKeyValuePairValue?.replace('{movie_id}', movie_id)}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=videos`;
      break;
    case !!person_id:
      url = `${tmdbEndPointKeyValuePairValue?.replace('{person_id}', person_id)}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
      break;
    default:
      url = `${tmdbEndPointKeyValuePairValue}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
  }

  try {
    // Fetch data
    const response: Response = await fetch(`${url}`, options);
    const rawData: Type_Tmdb_FetcherReturn_ObjPromise_isUndefined = await response.json();

    // Throw status code if response is not ok && abort fetch, else return data
    if (!response.ok) {
      controller?.abort();
      throw new Error(`${response.status}`);
    } else return rawData;

    // Catch errors
  } catch (error) {
    console.error('Request aborted, failure status: ', error);
  }
};
