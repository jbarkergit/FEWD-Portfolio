// Deps
import { useEffect, useRef, useState } from 'react';
// Context
import { useCatalogProvider } from '../../../context/CatalogContext';
// Composables
import { Namespace_Tmdb, useTmdbFetcher } from '../../../composables/tmdb-api/hooks/useTmdbFetcher';
// Hooks
import { usePostersPerPage } from '../../../hooks/usePostersPerPage';
// Data
import { Namespace_TmdbEndpointsKeys } from '../../../composables/tmdb-api/data/tmdbEndPoints';
// Features
import FDCarouselSearch from './media-carousel-search/FDCarouselSearch';
import FDCarousels from '../../../components/FDCarousels';

const FDMedia = () => {
  const { route, isMenuOpen, setHeroData } = useCatalogProvider();
  const [paginatedData, setPaginatedData] = useState<Map<string, Namespace_Tmdb.BaseMedia_Provider[][]> | undefined>(undefined);

  /** Fetch data when user requests a route, pass to processDataPagination() */
  type Prefabs_Obj_isUndefined = Namespace_Tmdb.Prefabs_Obj | undefined;

  const fetchDataByRoute = async (): Promise<void> => {
    if (route === 'home') {
      const routeData = (await useTmdbFetcher([{ now_playing: undefined }, { upcoming: undefined }, { trending_today: undefined }, { trending_this_week: undefined }])) as Namespace_Tmdb.Prefabs_Obj[] | Prefabs_Obj_isUndefined[];

      const filteredHomeData = routeData.filter((obj) => obj !== undefined) as Namespace_Tmdb.Prefabs_Obj[];
      processDataPagination(filteredHomeData);
    } else {
      const routeData = (await useTmdbFetcher({ discover: 'comedy' })) as Namespace_Tmdb.Discover_Obj;
      processDataPagination(routeData);
    }
  };

  useEffect(() => {
    fetchDataByRoute();
  }, [route]);

  /** Pagination && carousel, hero data creation */
  const maxVisibleCarouselNodes: number | undefined = usePostersPerPage();

  const processDataPagination = (rawData: Namespace_Tmdb.Prefabs_Obj[] | Namespace_Tmdb.Discover_Obj | undefined) => {
    if (!rawData || !maxVisibleCarouselNodes) return;

    // Init mutatable map in outter scope to reduce state updates when paginating data
    let dataMap: Map<string, Namespace_Tmdb.BaseMedia_Provider[][]> = new Map([]);

    // Paginate data
    const setData = (targetKey: Namespace_TmdbEndpointsKeys.Prefabs_Keys, data: Namespace_Tmdb.BaseMedia_Provider[]): void => {
      // Pagination iteration dependency calculation
      const maxIteratorIndex: number = Math.ceil((data.length - 1) / maxVisibleCarouselNodes);
      // Get map by key
      const targetMapArr: Namespace_Tmdb.BaseMedia_Provider[][] | undefined = dataMap.get(targetKey);
      // If key doesn't exist in map, create new entry
      if (!targetMapArr) dataMap.set(targetKey, []);

      // Paginate data
      for (let iteratorCounter = 0; iteratorCounter < maxIteratorIndex; iteratorCounter++) {
        const startingSliceIndex: number = maxVisibleCarouselNodes * iteratorCounter + iteratorCounter;
        const endingSliceIndex: number = maxVisibleCarouselNodes * (iteratorCounter + 1) + 1;
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

    // Set state
    setPaginatedData(dataMap);

    // Create hero data
    const firstMapValue: Namespace_Tmdb.BaseMedia_Provider | undefined = dataMap.entries().next().value?.[1][0][0];
    if (firstMapValue) setHeroData(firstMapValue);
  };

  /** Carousel DeltaY scroll logic */
  const fdMediaRef = useRef<HTMLElement>(null);

  // Update previously active and newly active carousel node's data-attr, navigate
  const deltaScrollCarousels = (delta: 1 | -1): void => {
    if (!fdMediaRef.current) return;
    const carouselNodesArr: Element[] = [...fdMediaRef.current?.children];

    // Gather indexes
    const activeNodeIndex: number = carouselNodesArr.findIndex((node: Element) => node.getAttribute('data-anim') === 'active');
    const nextActiveNodeIndex: number = Math.max(0, Math.min(activeNodeIndex + delta, carouselNodesArr.length - 1));

    // Handle attributes
    if (nextActiveNodeIndex !== activeNodeIndex) {
      if (nextActiveNodeIndex > activeNodeIndex) carouselNodesArr[activeNodeIndex].setAttribute('data-anim', 'disabled');
      carouselNodesArr[nextActiveNodeIndex].setAttribute('data-anim', 'active');
    }

    // Scroll
    const nextActiveNodeOffsetTop: number = (carouselNodesArr[nextActiveNodeIndex] as HTMLElement).offsetTop;
    fdMediaRef.current.style.top = `${nextActiveNodeOffsetTop * -1}px`;
  };

  const handleWheel = (event: WheelEvent) => deltaScrollCarousels(event.deltaY > 0 ? 1 : -1);

  useEffect(() => {
    if (isMenuOpen) window.removeEventListener('wheel', handleWheel);
    else window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [fdMediaRef.current, isMenuOpen]);

  /** Component */
  return (
    <main className='fdMedia' ref={fdMediaRef} style={{ top: '0px' }}>
      {paginatedData &&
        Array.from(paginatedData.entries()).map(([key, value], index) => (
          <FDCarousels
            variant={{
              type: 'movies',
              mapIndex: index,
              heading: key,
              data: value,
            }}
            key={key}
          />
        ))}
      <FDCarouselSearch setHeroData={setHeroData} />
    </main>
  );
};

export default FDMedia;
