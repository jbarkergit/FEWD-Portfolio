import { tmdbEndpoints, Type_TmdbEndpoint_Keys_Union } from '../data/tmdbEndPoints';
import { tmdbMovieGenres, Type_MovieGenre_Keys } from '../data/tmdbGenres';

type Type_Tmdb_UrlBuilder_Obj_isOpt = Partial<{
  movie_id: number;
  genre: string;
  querie: string;
}>;

export const useTmdbUrlBuilder = (keyArg: Type_TmdbEndpoint_Keys_Union, optArgs?: Type_Tmdb_UrlBuilder_Obj_isOpt): { [x: string]: string } | undefined => {
  // Generate array of key-value pairs
  const tmdbKeyEndpointArr: { [key: string]: string }[] = Object.entries(tmdbEndpoints).flatMap(([category, endpoints]) =>
    Object.entries(endpoints).map(([key, value]) => ({ [key]: value }))
  );

  // Find requested object
  const requestedObj: { [key: string]: string } | undefined = tmdbKeyEndpointArr.find((obj) => Object.keys(obj)[0] === keyArg);

  // Throw error func
  const throwError = (error: string): void => {
    return console.error(`Failure to build endpoint: ${error}.`);
  };

  // !requestedObj ? throw error, short return : null
  if (!requestedObj) {
    throwError('requested object not found');
    return undefined;
  }

  // Import API Key
  const apiKey: string = import.meta.env.VITE_TMDB_API_KEY;

  // !apiKey ? throw error, short return : null
  if (!apiKey) {
    throwError('API Key could not be retrieved');
    return undefined;
  }

  // Build endpoint
  let [key, endpoint] = Object.entries(requestedObj)[0];

  switch (true) {
    case !!optArgs?.movie_id:
      endpoint = endpoint.replace('{movie_id}', `${optArgs?.movie_id}`) + `?api_key=${apiKey}`;
      break;
    case !!optArgs?.genre:
      endpoint = endpoint
        .replace('/movie', `/movie?api_key=${apiKey}`)
        .replace('{genre_ids}', `&with_genres=${tmdbMovieGenres[optArgs?.genre as Type_MovieGenre_Keys]}`);
      break;
    case !!optArgs?.querie:
      endpoint = endpoint + `?query=${optArgs?.querie}&include_adult=false&language=en-US&page=1`;
      break;
    default:
      endpoint = endpoint + `?api_key=${apiKey}`;
      break;
  }

  return { [key as Type_TmdbEndpoint_Keys_Union]: endpoint };
};
