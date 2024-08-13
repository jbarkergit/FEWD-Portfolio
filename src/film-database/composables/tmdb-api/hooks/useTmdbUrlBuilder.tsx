import { Type_Tmdb_Movie_Keys_Union, tmdbMovieEndpoints } from '../data/tmdbEndPoints';
import { Type_MovieGenre_Keys } from '../data/tmdbMovieGenres';
import { useTmdbGenres } from './useTmdbGenres';

type Type_Tmdb_EndpointBuilder_Arr_Opt = Partial<{
  language: 'en-US';
  page: number;
  movie_id: number;
  append_to_response: 'videos' | 'images' | 'videos,images';
  genre: string;
  querie: string;
  provider: number;
}>;

export const useTmdbUrlBuilder = (key: Type_Tmdb_Movie_Keys_Union, args?: Type_Tmdb_EndpointBuilder_Arr_Opt[]) => {
  const tmdbMovieEndpointsFlatmap: string[][] = Object.entries(tmdbMovieEndpoints).flatMap(([key, endpoint]) =>
    Object.entries(endpoint).map(([endpointKey, endpointValue]) => [endpointKey, endpointValue])
  );

  // Target entry (autofill provides type security; therefore, we're set to use the non-null assertion operator)
  let keyEntry: string[] = tmdbMovieEndpointsFlatmap.find((entry) => entry[0] === key)!;

  // Api Key
  const apiKey: string = import.meta.env.VITE_TMDB_API_KEY;

  // If args, iterate args, mutate endpoint
  if (args) {
    // Init mutatable variable with endpoint (by-pass custom types with loose type cast)
    let keyValuePair = { key: keyEntry[0], endpoint: keyEntry[1] as unknown as string };

    args.forEach((arg) => {
      switch (true) {
        case !!arg.append_to_response:
          keyValuePair = { key: keyEntry[0], endpoint: keyEntry[1] + `&append_to_response=${arg.append_to_response}` + `/movie?api_key=${apiKey}` };
          break;

        case !!arg.language:
          keyValuePair = { key: keyEntry[0], endpoint: keyEntry[1] + `?language=${arg.language}` + `/movie?api_key=${apiKey}` };
          break;

        case !!arg.movie_id:
          keyValuePair = { key: keyEntry[0], endpoint: keyEntry[1].replace('3/movie/', `3/movie/${arg.movie_id}`) + `?api_key=${apiKey}` };
          break;

        case !!arg.page:
          keyValuePair = { key: keyEntry[0], endpoint: keyEntry[1] + `&page=${arg.page}` + `/movie?api_key=${apiKey}` };
          break;

        case !!arg.genre:
          const routeId: number = useTmdbGenres().id(arg.genre as Type_MovieGenre_Keys);
          keyValuePair = {
            key: arg.genre,
            endpoint: keyEntry[1].replace('/movie', `/movie?api_key=${apiKey}`).replace('{genre_ids}', `&with_genres=${routeId}`),
          };
          break;

        case !!arg.querie:
          keyValuePair = { key: keyEntry[0], endpoint: keyEntry[1] + `?query=${arg.querie}&include_adult=false&language=en-US&page=1` };
          break;

        case !!arg.provider:
          keyValuePair = { key: keyEntry[0], endpoint: keyEntry[1].replace('{movie_id}', `${arg.provider}`) + `?api_key=${apiKey}` };
          break;

        default:
          keyValuePair = { key: keyEntry[0], endpoint: keyEntry[1] + `/movie?api_key=${apiKey}` };
          break;
      }
    });

    return keyValuePair;
  } else {
    return { key: keyEntry[0], endpoint: keyEntry[1] };
  }
};
