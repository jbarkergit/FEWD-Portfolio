import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Api Data
import { Type_Tmdb_Movie_Keys_Union, tmdbMovieEndpoints } from '../composables/tmdb-api/data/tmdbEndPoints';
// Api Types
import { Type_Tmdb_Api_Union } from '../composables/tmdb-api/types/TmdbDataTypes';
// Api Hooks
import { Type_useFetchTmdbResponse_KeyValuePairArr, useFetchTmdbResponse } from '../composables/tmdb-api/hooks/useFetchTmdbResponse';
// Components
import FDCarousel from '../components/carousel/FDCarousel';
import FDHeader from '../components/header/FDHeader';
import FDHero from '../components/hero/FDHero';

const FilmDatabase = () => {
  /** Fetch data by pathname, pass to pagination func */
  const useLocationPathname = useLocation().pathname;

  const fetchDataByPathname = () => {
    let keyValuePairArr: [string, string][] = [];

    switch (useLocationPathname) {
      case '/film-database/genre/horror':
        keyValuePairArr = [];
        break;

      default:
        keyValuePairArr = Array.from(tmdbMovieEndpoints.theatrical.entries());
        break;
    }

    useFetchTmdbResponse({ endPoint_keyValuePairArr: keyValuePairArr }).then((data) => {
      if (!data) return;
      paginateData(data);
    });
  };

  useEffect(() => fetchDataByPathname(), []);

  /** Data Pagination, State Setter */
  const [tmdbDataMap, setTmdbDataMap] = useState<Map<string, Type_Tmdb_Api_Union[][]>>(new Map());
  // const maxCarouselNodes: number = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--my-variable')); revisit
  const maxVisibleCarouselNodes: number = 8;

  const paginateData = (data: Type_useFetchTmdbResponse_KeyValuePairArr | undefined) => {
    let dataMap: typeof tmdbDataMap = new Map();

    data?.forEach(([key, value]) => {
      dataMap.set(key, []);

      let iteratorCounter: number = 0;
      const maxIteratorIndex: number = Math.ceil((value.length - 1) / maxVisibleCarouselNodes);

      while (iteratorCounter < maxIteratorIndex) {
        const startingSliceIndex: number = maxVisibleCarouselNodes * iteratorCounter + iteratorCounter;
        const endingSliceIndex: number = iteratorCounter === 0 ? maxVisibleCarouselNodes : maxVisibleCarouselNodes * (iteratorCounter + 1) + 1;
        const paginatedData: Type_Tmdb_Api_Union[] = value.slice(startingSliceIndex, endingSliceIndex);
        const iterableMap: Type_Tmdb_Api_Union[][] | undefined = dataMap.get(key);

        if (iterableMap) {
          iterableMap.push(paginatedData);
          iteratorCounter = iteratorCounter + 1;
        } else {
          console.error('Failure to push to map, skipping pagination iteration.');
          break;
        }
      }
      setTmdbDataMap(dataMap);
    });
  };

  /** Get paginated data by key (autofill provided) */
  const fdMediaRef = useRef<HTMLElement>(null);

  const createComponentByMapKey = (key: Type_Tmdb_Movie_Keys_Union): JSX.Element | null => {
    const isKeyInMap: boolean = tmdbDataMap.has(key);

    if (!isKeyInMap && Array.from(tmdbDataMap.entries()).length > 0) {
      console.error(`Failure to retrieve data for ${key}. Please ensure you're fetching it.`);
      return null;
    }

    const getPaginatedData: Type_Tmdb_Api_Union[][] | undefined = tmdbDataMap.get(key);
    if (!getPaginatedData) return null;

    return <FDCarousel dataKey={key} mapValue={getPaginatedData} maxVisibleCarouselNodes={maxVisibleCarouselNodes} />;
  };

  /** Carousel DeltaY scroll logic */
  const dataIndexTracker: string = 'data-index-tracker';
  const carouselNodes: HTMLCollection | undefined = fdMediaRef.current?.children;

  // Set data-attribute on first carousel node for index tracking without state (this won't fire post-mount thanks to our lack of state)
  useEffect(() => {
    if (carouselNodes) carouselNodes[0].setAttribute(dataIndexTracker, 'active');
  }, [carouselNodes]);

  // Update previously active and newly active carousel node's data-attr, navigate
  const deltaScrollCarousels = (deltaY: number): void => {
    const deltaIndex: 1 | -1 = deltaY > 0 ? 1 : -1;

    if (!fdMediaRef.current || !carouselNodes) return;
    const carouselNodesArr: Element[] = [...carouselNodes];

    const activeNodeIndex: number = [...fdMediaRef.current.children].findIndex((node: Element) => node.getAttribute(dataIndexTracker) === 'active');
    const nextActiveNodeIndex: number = Math.max(0, Math.min(activeNodeIndex + deltaIndex, carouselNodesArr.length - 1));

    carouselNodesArr[activeNodeIndex].setAttribute(dataIndexTracker, 'disabled');
    carouselNodesArr[nextActiveNodeIndex].setAttribute(dataIndexTracker, 'active');

    const nextActiveNodeOffsetTop: number = (carouselNodesArr[nextActiveNodeIndex] as HTMLElement).offsetTop;
    const firstNodePaddingTop: number = parseInt(window.getComputedStyle(carouselNodes[0] as HTMLElement).paddingTop);
    const scrollPosition: number = nextActiveNodeOffsetTop - firstNodePaddingTop;

    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
  };

  /** Component */
  return (
    <div className='filmDatabase'>
      <FDHeader />
      <FDHero />
      <main className='fdMedia' ref={fdMediaRef} onWheel={(event: React.WheelEvent<HTMLElement>) => deltaScrollCarousels(event.deltaY)}>
        {createComponentByMapKey('now_playing')}
        {createComponentByMapKey('upcoming')}
        {createComponentByMapKey('upcoming')}
        {createComponentByMapKey('upcoming')}
        {createComponentByMapKey('upcoming')}
        {createComponentByMapKey('upcoming')}
        {createComponentByMapKey('upcoming')}
        {createComponentByMapKey('upcoming')}
        {createComponentByMapKey('upcoming')}
      </main>
    </div>
  );
};

export default FilmDatabase;
