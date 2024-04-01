import { useDiscoverGenre } from '../hooks/useDiscoverGenre';
import { Type_Tmdb_FetcherReturn_ObjPromise_isUndefined, Type_Tmdb_OptParam_Union_isUndefined } from '../types/TmdbDataTypes';

/** PARAMETER (PAYLOAD) TYPE */
type Type_TmdbFetcher_Invoke_Params = {
  controller: AbortController;
  keyValuePairEndPoint: string | undefined;
  parameter?: Type_Tmdb_OptParam_Union_isUndefined;
};

export const tmdbFetcher = async ({
  controller,
  keyValuePairEndPoint,
  parameter,
}: Type_TmdbFetcher_Invoke_Params): Type_Tmdb_FetcherReturn_ObjPromise_isUndefined => {
  // Authorization options for TMDB API
  const options: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH_KEY}`,
    },
    // signal: controller.signal,
  };

  // Alter URL according to optional parameters
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  let url: string;

  switch (true) {
    case !!parameter:
      switch (true) {
        case parameter === 'movie_id':
          url = `${keyValuePairEndPoint?.replace('{movie_id}', parameter)}?api_key=${apiKey}&append_to_response=videos`;
          break;
        case parameter === 'person_id':
          url = `${keyValuePairEndPoint?.replace('{person_id}', parameter)}?api_key=${apiKey}`;
          break;
        case parameter instanceof Object && parameter.type === 'movie':
          url = `${keyValuePairEndPoint}?include_adult=true&include_video=true&language=en-US&page=1&sort_by=primary_release_date.asc&with_genres=${parameter.genreNum}`;
          break;
        default:
          console.error(`Parameter is ${parameter}`);
          break;
      }

    default:
      url = `${keyValuePairEndPoint}?api_key=${apiKey}`;
      break;
  }

  try {
    // Fetch data
    const response: Response = await fetch(`${url}`, options);
    const rawData: Type_Tmdb_FetcherReturn_ObjPromise_isUndefined = await response.json();

    // Throw status code if response is not ok && abort fetch, else return data
    if (!response.ok) {
      controller?.abort();
      throw new Error(`${response.status}`);
    } else {
      return rawData;
    }

    // Catch errors
  } catch (error) {
    console.error('Request aborted, failure status: ', error);
  }
};
