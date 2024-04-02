import {
  Type_TmdbFetcher_Payload,
  Type_Tmdb_FetcherReturn_ObjPromise_isUndefined,
  Type_Tmdb_MovieIdParam_Obj,
  Type_Tmdb_PersonIdParam_Obj,
  Type_Tmdb_TrailerParam_Obj,
} from '../types/TmdbDataTypes';

export const tmdbFetcher = async ({ controller, keyValuePairEndPoint, parametersObj }: Type_TmdbFetcher_Payload): Type_Tmdb_FetcherReturn_ObjPromise_isUndefined => {
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
    case parametersObj !== undefined:
      switch (true) {
        case parametersObj.typeGuardKey === 'movie_id':
          url = `${keyValuePairEndPoint?.replace('{movie_id}', (parametersObj as unknown as Type_Tmdb_MovieIdParam_Obj).propValue)}?api_key=${apiKey}&append_to_response=videos`;
          break;

        case parametersObj.typeGuardKey === 'person_id':
          url = `${keyValuePairEndPoint?.replace('{person_id}', (parametersObj as unknown as Type_Tmdb_PersonIdParam_Obj).propValue)}?api_key=${apiKey}`;
          break;

        // Needs parameter work
        // case parameter.typeGuardKey === 'discover':
        //   url = `${keyValuePairEndPoint}?include_adult=true&include_video=true&language=en-US&page=1&sort_by=primary_release_date.asc&with_genres=${(parameter as unknown as Type_Tmdb_DiscoverParam_Obj_isUndefined).genreNum}`;
        //   break;

        case parametersObj.typeGuardKey === 'trailer_id':
          url = `${keyValuePairEndPoint?.replace('{movie_id}', `${(parametersObj as unknown as Type_Tmdb_TrailerParam_Obj).propValue}`)}?api_key=${apiKey}`;
          console.log(url);
          break;

        default:
          // Identify if the parameter is being passed correctly || is undefined
          console.error(`Parameter is ${parametersObj}`);
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
