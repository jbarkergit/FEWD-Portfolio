import { tmdbEndpoints } from '../composables/tmdb-api/data/tmdbEndPoints';
import type { Namespace_TmdbEndpointsKeys } from '../composables/tmdb-api/data/tmdbEndPoints';
import { tmdbMovieGenres } from '../composables/tmdb-api/data/tmdbGenres';
import type { Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';

export type Type_usePaginateData_Data_Provider = Array<
  Namespace_Tmdb.BaseMedia_Provider | Namespace_Tmdb.Credits_Obj['credits']['cast'][0] | Namespace_Tmdb.Credits_Obj['credits']['crew'][0]
>;

export const usePaginateData = (rawData: Namespace_Tmdb.Response_Union[] | Namespace_Tmdb.Response_Union, viewportChunkSize: number) => {
  // Initialize mutatable map
  let store: Map<Namespace_TmdbEndpointsKeys.Keys_Union, Type_usePaginateData_Data_Provider[]> | undefined = new Map(undefined);

  // Paginate data callback
  const paginateData = (targetKey: Namespace_TmdbEndpointsKeys.Keys_Union, data: Type_usePaginateData_Data_Provider) => {
    // Get map by key
    const isKeyMapped: boolean = store.has(targetKey);

    // If key doesn't exist in map, create new entry
    if (!isKeyMapped) store.set(targetKey, []);

    // Paginate data
    for (let i = 0; i < data.length; i += viewportChunkSize + 1) {
      store.get(targetKey)!.push(data.slice(i, i + viewportChunkSize + 1));
    }
  };

  // Envoke pagination
  const process = (obj: typeof rawData) => {
    const key = Object.keys(obj)[0] as Namespace_TmdbEndpointsKeys.Keys_Union;

    if (key in tmdbEndpoints.prefabs || key in tmdbMovieGenres) {
      //@ts-ignore
      const i = (obj[key] as Namespace_Tmdb.Recommendations_Provider<Namespace_Tmdb.BaseMedia_Provider>).results;
      paginateData(key, i);
    } else if (key === 'credits') {
      const {
        credits: { id, cast, crew },
      } = obj as Namespace_Tmdb.Credits_Obj;

      paginateData('cast', cast);
      paginateData('crew', crew);
    } else {
      return undefined;
    }
  };

  Array.isArray(rawData) ? rawData.forEach((obj) => process(obj)) : process(rawData);

  // Return
  return Array.from(store);
};
