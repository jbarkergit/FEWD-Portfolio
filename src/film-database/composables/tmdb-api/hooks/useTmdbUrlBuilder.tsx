import { Type_Tmdb_Movie_Keys_Union, tmdbMovieEndpointsFlatmap } from '../data/tmdbEndPoints';

type Type_Tmdb_EndpointBuilder_Arr_Opt = Partial<{
  language: string;
  page: number;
  movie_id: number;
  append_to_response: string;
}>;

export const useTmdbUrlBuilder = (key: Type_Tmdb_Movie_Keys_Union, args?: Type_Tmdb_EndpointBuilder_Arr_Opt[]) => {
  // Target entry
  let keyEntry = tmdbMovieEndpointsFlatmap.find((entry) => entry.key === key);

  // Short return
  if (!keyEntry) {
    console.error('Failure at Tmdb Url Builder: Could not find ${key}.');
    return undefined;
  }

  // Init mutatable variable with endpoint (by-pass custom types with loose type cast)
  let endpoint = keyEntry?.endpoint as unknown as string;

  // If args, iterate args, mutate endpoint
  if (args) {
    args.forEach((arg) => {
      switch (arg) {
        case arg.append_to_response:
          break;

        case arg.language:
          break;

        case arg.movie_id:
          break;

        case arg.page:
          break;

        default:
          break;
      }
    });

    return { key: keyEntry.key, endpoint: endpoint };
  } else {
    return keyEntry;
  }
};
