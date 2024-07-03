import { Type_Tmdb_Movie_Keys_Union, tmdbMovieEndpoints } from '../data/tmdbEndPoints';
import { Type_MovieGenre_Keys } from '../data/tmdbMovieGenres';
import { useTmdbGenres } from './useTmdbGenres';

type Type_Tmdb_EndpointBuilder_Arr_Opt = Partial<{
  language: 'en-US';
  page: number;
  movie_id: number;
  append_to_response: 'videos' | 'images' | 'videos,images';
  genre: string;
}>;

export const useTmdbUrlBuilder = (key: Type_Tmdb_Movie_Keys_Union, args?: Type_Tmdb_EndpointBuilder_Arr_Opt[]) => {
  const tmdbMovieEndpointsFlatmap: string[][] = Object.entries(tmdbMovieEndpoints).flatMap(([key, endpoint]) =>
    Object.entries(endpoint).map(([endpointKey, endpointValue]) => [endpointKey, endpointValue])
  );

  // Target entry (autofill provides type security; therefore, we're set to use the non-null assertion operator)
  let keyEntry: string[] = tmdbMovieEndpointsFlatmap.find((entry) => entry[0] === key)!;

  // If args, iterate args, mutate endpoint
  if (args) {
    // Init mutatable variable with endpoint (by-pass custom types with loose type cast)
    let endpoint = keyEntry[1] as unknown as string;

    args.forEach((arg) => {
      switch (true) {
        case !!arg.append_to_response:
          endpoint = endpoint + `&append_to_response=${arg.append_to_response}`;
          break;

        case !!arg.language:
          endpoint = endpoint + `?language=${arg.language}`;
          break;

        case !!arg.movie_id:
          endpoint = endpoint.replace('3/movie/', `3/movie/${arg.movie_id}`);
          break;

        case !!arg.page:
          endpoint = endpoint + `&page=${arg.page}`;
          break;

        case !!arg.genre:
          const routeId: number = useTmdbGenres().id(arg.genre as Type_MovieGenre_Keys);
          endpoint = endpoint.replace('{genre_ids}', `&with_genres=${routeId}`);
          break;

        default:
          endpoint = keyEntry[1] as unknown as string;
          break;
      }
    });

    return { key: keyEntry[0], endpoint: endpoint };
  } else {
    return { key: keyEntry[0], endpoint: keyEntry[1] };
  }
};
