import { Namespace_TmdbEndpointsKeys } from '../composables/tmdb-api/data/tmdbEndPoints';
import { Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';

export const usePaginateData = (
  rawData: Namespace_Tmdb.Prefabs_Obj[] | Namespace_Tmdb.Discover_Obj | undefined,
  maxCarouselNodes: number | undefined,
  setHeroData: React.Dispatch<React.SetStateAction<Namespace_Tmdb.BaseMedia_Provider | undefined>>
) => {
  if (!rawData || !maxCarouselNodes || !setHeroData) return;

  // Init mutatable map in outter scope to reduce state updates when paginating data
  let dataMap: Map<string, Namespace_Tmdb.BaseMedia_Provider[][]> = new Map([]);

  // Paginate data
  const setData = (targetKey: Namespace_TmdbEndpointsKeys.Prefabs_Keys, data: Namespace_Tmdb.BaseMedia_Provider[]): void => {
    // Pagination iteration dependency calculation
    const maxIteratorIndex: number = Math.ceil((data.length - 1) / maxCarouselNodes);
    // Get map by key
    const targetMapArr: Namespace_Tmdb.BaseMedia_Provider[][] | undefined = dataMap.get(targetKey);
    // If key doesn't exist in map, create new entry
    if (!targetMapArr) dataMap.set(targetKey, []);

    // Paginate data
    for (let iteratorCounter = 0; iteratorCounter < maxIteratorIndex; iteratorCounter++) {
      const startingSliceIndex: number = maxCarouselNodes * iteratorCounter + iteratorCounter;
      const endingSliceIndex: number = maxCarouselNodes * (iteratorCounter + 1) + 1;
      const paginatedData: Namespace_Tmdb.BaseMedia_Provider[] = data.slice(startingSliceIndex, endingSliceIndex);
      dataMap.get(targetKey)?.push(paginatedData); // Push data into dataMap
    }
  };

  // Prep data for pagination
  if (Array.isArray(rawData)) {
    (rawData as Namespace_Tmdb.Prefabs_Obj[]).forEach((item) => {
      const itemKey = Object.keys(item)[0] as Namespace_TmdbEndpointsKeys.Prefabs_Keys;
      const results: Namespace_Tmdb.BaseMedia_Provider[] = item[itemKey].results;
      setData(itemKey, results);
    });
  } else {
    const itemKey = Object.keys(rawData)[0] as Namespace_TmdbEndpointsKeys.Prefabs_Keys;
    const results = rawData.discover.results;
    setData(itemKey, results);
  }

  // Create hero data
  const firstMapValue: Namespace_Tmdb.BaseMedia_Provider | undefined = dataMap.entries().next().value?.[1][0][0];
  if (firstMapValue) setHeroData(firstMapValue);

  // Return
  return dataMap;
};
