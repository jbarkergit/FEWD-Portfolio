import { Namespace_TmdbEndpointsKeys, tmdbEndpoints } from '../composables/tmdb-api/data/tmdbEndPoints';
import { tmdbMovieGenres } from '../composables/tmdb-api/data/tmdbGenres';
import { Namespace_Tmdb, useTmdbFetcher } from '../composables/tmdb-api/hooks/useTmdbFetcher';

type Type_usePaginateData_Data_Provider = Array<
  Namespace_Tmdb.BaseMedia_Provider | Namespace_Tmdb.Credits_Obj['credits']['cast'][0] | Namespace_Tmdb.Credits_Obj['credits']['crew'][0]
>;

export const usePaginateData = (rawData: ReturnType<typeof useTmdbFetcher>) => {
  // Initialize mutatable map
  type Type_usePaginateData_TargetKeys = Namespace_TmdbEndpointsKeys.Keys_Union & 'Cast' & 'Crew';
  let store: Map<Type_usePaginateData_TargetKeys, Type_usePaginateData_Data_Provider[]> | undefined = new Map(undefined);
  console.log(store);

  // Paginate data callback
  const paginateData = (targetKey: Type_usePaginateData_TargetKeys, data: Type_usePaginateData_Data_Provider) => {
    // Get map by key
    const isKeyMapped: boolean = store.has(targetKey);

    // If key doesn't exist in map, create new entry
    if (!isKeyMapped) store.set(targetKey, []);

    // Max carousel nodes
    const root: Element | null = document.querySelector('[data-layout-carousel]');
    const maxCarouselNodes: number = parseInt(getComputedStyle(root!).getPropertyValue('--fd-carousel-items-per-page'));

    // Paginate data
    for (let i = 0; i < data.length; i += maxCarouselNodes + 1) {
      store.get(targetKey)!.push(data.slice(i, i + maxCarouselNodes + 1));
    }
  };

  // Envoke pagination
  const process = (obj: ReturnType<typeof useTmdbFetcher>) => {
    const key = Object.keys(obj)[0] as Type_usePaginateData_TargetKeys;
    const data = obj[key] as unknown;

    if (key in tmdbEndpoints.prefabs || key in tmdbMovieGenres) {
      const i = (data as Namespace_Tmdb.Recommendations_Provider<Namespace_Tmdb.BaseMedia_Provider>).results;
      paginateData(key, i);
    } else if (key === 'cast' || key === 'crew') {
    } else {
      return undefined;
    }
  };

  Array.isArray(rawData) ? rawData.forEach((obj) => process(obj)) : process(rawData);

  // Return
  return Array.from(store);
};
