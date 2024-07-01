import { Type_Tmdb_Movie_Keys_Union, tmdbMovieEndpointsFlatmap } from '../data/tmdbEndPoints';

type Type_Tmdb_EndpointBuilder_Arr_Opt = Partial<{
  language: 'en-US';
  page: number;
  movie_id: number;
  append_to_response: 'videos' | 'images' | 'videos,images';
}>;

export const useTmdbUrlBuilder = (key: Type_Tmdb_Movie_Keys_Union, args?: Type_Tmdb_EndpointBuilder_Arr_Opt[]) => {
  // Target entry
  let keyEntry = tmdbMovieEndpointsFlatmap.find((entry) => entry.key === key);

  // Short return
  if (!keyEntry) {
    console.error('Failure at Tmdb Url Builder: Could not find ${key}.');
    return undefined;
  }

  // If args, iterate args, mutate endpoint
  if (args) {
    const buildUrl = () => {
      // Init mutatable variable with endpoint (by-pass custom types with loose type cast)
      let endpoint = keyEntry?.endpoint as unknown as string;

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

          default:
            break;
        }
      });

      return endpoint;
    };

    return { key: keyEntry.key, endpoint: buildUrl() };
  } else {
    return keyEntry;
  }
};
