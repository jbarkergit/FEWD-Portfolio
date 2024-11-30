import { Namespace_TmdbEndpointsKeys } from '../composables/tmdb-api/data/tmdbEndPoints';
import { Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';

export type Type_usePaginateData_Provider =
  | Namespace_Tmdb.BaseMedia_Provider[]
  | Namespace_Tmdb.Credits_Obj['credits']['cast']
  | Namespace_Tmdb.Credits_Obj['credits']['crew'];

type Type_usePaginateData_TargetKey_Provider = Namespace_TmdbEndpointsKeys.Keys_Union | 'Cast' | 'Crew';

export const usePaginateData = (rawData: Namespace_Tmdb.Prefabs_Obj[] | Namespace_Tmdb.Discover_Obj | Namespace_Tmdb.Credits_Obj | undefined) => {
  // Get visible carousel nodes
  const root: Element | null = document.querySelector('[data-layout-carousel]');
  if (!rawData || !root) return;
  const maxCarouselNodes: number = parseInt(getComputedStyle(root).getPropertyValue('--fd-carousel-items-per-page'));

  // Init mutatable map in outter scope to reduce state updates when paginating data
  let dataMap: Map<Type_usePaginateData_TargetKey_Provider, Array<Type_usePaginateData_Provider>> = new Map();

  // Paginate data
  const setData = (targetKey: Type_usePaginateData_TargetKey_Provider, data: Type_usePaginateData_Provider): void => {
    // Get map by key
    const isKeyMapped: boolean = dataMap.has(targetKey);
    // If key doesn't exist in map, create new entry
    if (!isKeyMapped) dataMap.set(targetKey, []);

    // Paginate data
    for (let i = 0; i < data.length; i += maxCarouselNodes + 1) {
      dataMap.get(targetKey)?.push(data.slice(i, i + maxCarouselNodes + 1));
    }
  };

  // Prep data for pagination
  if (Array.isArray(rawData)) {
    for (const item of rawData) {
      const itemKey = Object.keys(item)[0] as Namespace_TmdbEndpointsKeys.Prefabs_Keys;
      const results: Namespace_Tmdb.BaseMedia_Provider[] = item[itemKey].results;
      setData(itemKey, results);
    }
  } else if ('credits' in rawData) {
    const cast: Namespace_Tmdb.Credits_Obj['credits']['cast'] = rawData.credits.cast;
    const crew: Namespace_Tmdb.Credits_Obj['credits']['crew'] = rawData.credits.crew;
    setData('Cast', cast);
    setData('Crew', crew);
  } else {
    const itemKey = Object.keys(rawData)[0] as Namespace_TmdbEndpointsKeys.Prefabs_Keys;
    const results: Namespace_Tmdb.BaseMedia_Provider[] = rawData.discover.results;
    setData(itemKey, results);
  }

  // Return
  return Array.from(dataMap);
};
