import { Type_Tmdb_Movie_Keys_Union, tmdbEndpoints } from '../data/tmdbEndPoints';
import { tmdbMovieGenres, Type_MovieGenre_Keys } from '../data/tmdbGenres';

type Type_Tmdb_BuildEndpoint_Arr_Opt = Partial<{
  movie_id: number;
  genre: string;
  querie: string;
}>;

export const useTmdbUrlBuilder = (keyArg: Type_Tmdb_Movie_Keys_Union, optArgs?: Type_Tmdb_BuildEndpoint_Arr_Opt): { key: string; endpoint: string } | undefined => {
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

  // Build endpoints function
  const buildEndpoint = (arg?: Type_Tmdb_BuildEndpoint_Arr_Opt): { key: string; endpoint: string } => {
    let [key, endpoint] = Object.entries(requestedObj)[0];

    switch (true) {
      case arg && !!arg.movie_id:
        endpoint = endpoint.replace('{movie_id}', `${arg.movie_id}`) + `?api_key=${apiKey}`;
        break;
      case arg && !!arg.genre:
        endpoint = endpoint
          .replace('/movie', `/movie?api_key=${apiKey}`)
          .replace('{genre_ids}', `&with_genres=${tmdbMovieGenres[arg.genre as Type_MovieGenre_Keys]}`);
        break;
      case arg && !!arg.querie:
        endpoint = endpoint + `?query=${arg.querie}&include_adult=false&language=en-US&page=1`;
        break;
      default:
        endpoint = endpoint + `?api_key=${apiKey}`;
        break;
    }

    return { key: key, endpoint: endpoint };
  };

  return buildEndpoint(optArgs);
};
