import { Namespace_TmdbEndpointsKeys } from '../composables/tmdb-api/data/tmdbEndPoints';
import { Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';

export const usePaginateData = (
  rawData: Namespace_Tmdb.Prefabs_Obj[] | Namespace_Tmdb.Discover_Obj | Namespace_Tmdb.Credits_Obj | undefined,
  maxCarouselNodes: number | undefined,
  setHeroData: React.Dispatch<React.SetStateAction<Namespace_Tmdb.BaseMedia_Provider | undefined>>
) => {
  if (!rawData || !maxCarouselNodes || !setHeroData) return;

  // Init mutatable map in outter scope to reduce state updates when paginating data
  let dataMap: Map<string, (Namespace_Tmdb.BaseMedia_Provider[] | Namespace_Tmdb.Credits_Obj['credits']['cast'] | Namespace_Tmdb.Credits_Obj['credits']['crew'])[]> =
    new Map([]);

  // Paginate data
  const setData = (
    targetKey: Namespace_TmdbEndpointsKeys.Prefabs_Keys | 'Cast' | 'Crew',
    data: Array<Namespace_Tmdb.BaseMedia_Provider> | Namespace_Tmdb.Credits_Obj['credits']['cast'] | Namespace_Tmdb.Credits_Obj['credits']['crew']
  ): void => {
    // Pagination iteration dependency calculation
    const maxIteratorIndex: number = Math.ceil((data.length - 1) / maxCarouselNodes);
    // Get map by key
    const targetMapArr = dataMap.get(targetKey);
    // If key doesn't exist in map, create new entry
    if (!targetMapArr) dataMap.set(targetKey, []);

    // Paginate data
    for (let iteratorCounter = 0; iteratorCounter < maxIteratorIndex; iteratorCounter++) {
      const startingSliceIndex: number = maxCarouselNodes * iteratorCounter;
      const endingSliceIndex: number = maxCarouselNodes * (iteratorCounter + 1);
      const paginatedData = data.slice(startingSliceIndex, endingSliceIndex) as
        | Namespace_Tmdb.BaseMedia_Provider[]
        | Namespace_Tmdb.Credits_Obj['credits']['cast']
        | Namespace_Tmdb.Credits_Obj['credits']['crew'];
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

  // Create hero data
  const firstEntry = dataMap.entries().next().value;

  if (firstEntry) {
    // Destructure first array value
    const [, value] = firstEntry;
    console.log(firstEntry);
    // First value (or entry)
    const firstValue = value?.[0]?.[0];
    // Set state
    if (firstValue) setHeroData(firstValue);
  }
  // Return
  return dataMap;
};
