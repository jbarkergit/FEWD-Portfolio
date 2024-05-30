import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Lib
import Lenis from 'lenis';
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
// const maxCarouselNodes: number = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--my-variable')); revisit

const FilmDatabase = () => {
  // State map holding [key, [unpaginated data, paginated data arrs]]
  const [tmdbDataMap, setTmdbDataMap] = useState<Map<string, Type_Tmdb_Api_Union[][]>>(new Map());
  // Global dependencies
  const maxVisibleCarouselNodes: number = 8;
  // Fetcher && session storage dependency
  const useLocationPathname = useLocation().pathname;

  const getMapEntry = (key: Type_Tmdb_Movie_Keys_Union) => {
    const tmdbEntriesArr = Object.values(tmdbMovieEndpoints).flatMap((map) => [...map.entries()]);
    // Explicitly cast parameter provides confidence behind the non-null assertion operator
    const targetEntry = tmdbEntriesArr.find((entry) => entry[0] === key)!;
    return targetEntry;
  };

  const fetchDataByPathname = () => {
    // Init key-endpoint pair arr, store key-endpoint pairs
    let keyEndpointPairArr: [Type_Tmdb_Movie_Keys_Union, string][] = [];

    // Assign keyEndpointPairArr
    switch (useLocationPathname) {
      case '/film-database':
        keyEndpointPairArr = [getMapEntry('now_playing'), getMapEntry('popular')];
        break;

      default:
        keyEndpointPairArr = [];
        break;
    }

    // Fetch, pass data to pagination
    useFetchTmdbResponse(keyEndpointPairArr).then((data) => {
      if (data) paginateData(data);
    });
  };

  useEffect(() => fetchDataByPathname(), []);

  const paginateData = (data: Type_useFetchTmdbResponse_KeyValuePairArr) => {
    // Init mutatable map in outter scope (helps reduce state updates)
    let dataMap: typeof tmdbDataMap = new Map([]);

    data.forEach(([key, value]) => {
      // Init entry with empty array or unpaginated data for pages
      dataMap.set(key, []);

      // Pagination iteration dependency calculation
      const maxIteratorIndex: number = Math.ceil((value.length - 1) / maxVisibleCarouselNodes);

      // Pagination
      for (let iteratorCounter = 0; iteratorCounter < maxIteratorIndex; iteratorCounter++) {
        const startingSliceIndex: number = maxVisibleCarouselNodes * iteratorCounter + iteratorCounter;
        const endingSliceIndex: number = iteratorCounter === 0 ? maxVisibleCarouselNodes : maxVisibleCarouselNodes * (iteratorCounter + 1) + 1;
        const paginatedData: Type_Tmdb_Api_Union[] = value.slice(startingSliceIndex, endingSliceIndex);
        const iterableMap: Type_Tmdb_Api_Union[][] = dataMap.get(key)!;

        iterableMap.push(paginatedData);
      }
    });

    // Set state
    setTmdbDataMap(dataMap);
  };

  /** JSX carousel component creation */
  const [carouselComponents, setCarouselComponents] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const tmdbStateComponents = (): JSX.Element[] => {
      return [...tmdbDataMap.entries()].map(([key, value], index) => {
        // Set data-attribute on first carousel node for index tracking without state
        return <FDCarousel dataKey={key} mapValue={value} maxVisibleCarouselNodes={maxVisibleCarouselNodes} isFirstIndex={index === 0 ? true : false} />;
      });
    };

    setCarouselComponents(tmdbStateComponents());
  }, [tmdbDataMap]);

  /** Carousel DeltaY scroll logic */
  const dataIndexTracker: string = 'data-index-tracker';
  const fdMediaRef = useRef<HTMLElement>(null);
  const carouselNodes: HTMLCollection | undefined = fdMediaRef.current?.children;

  // Init lenis
  const lenis = useRef<Lenis>(new Lenis());

  const raf = (time: number): void => {
    lenis.current.raf(time);
    requestAnimationFrame(raf);
  };

  // Update previously active and newly active carousel node's data-attr, navigate
  const deltaScrollCarousels = (deltaY: number): void => {
    // Convert deltaY to 1 or -1 for incrementation/decrementation
    const deltaIndex: 1 | -1 = deltaY > 0 ? 1 : -1;

    // Get elements
    if (!fdMediaRef.current || !carouselNodes) return;
    const carouselNodesArr: Element[] = [...carouselNodes];

    // Gather indexes
    const activeNodeIndex: number = [...fdMediaRef.current.children].findIndex((node: Element) => node.getAttribute(dataIndexTracker) === 'active');
    const nextActiveNodeIndex: number = Math.max(0, Math.min(activeNodeIndex + deltaIndex, carouselNodesArr.length - 1));

    if (activeNodeIndex !== nextActiveNodeIndex) {
      // Handle attributes
      carouselNodesArr[activeNodeIndex].setAttribute(dataIndexTracker, 'disabled');
      carouselNodesArr[nextActiveNodeIndex].setAttribute(dataIndexTracker, 'active');

      // Get scroll position
      const nextActiveNodeOffsetTop: number = (carouselNodesArr[nextActiveNodeIndex] as HTMLElement).offsetTop;
      const firstNodePaddingTop: number = parseInt(window.getComputedStyle(carouselNodes[0] as HTMLElement).paddingTop);
      const scrollPosition: number = nextActiveNodeOffsetTop - firstNodePaddingTop;

      // Scroll
      lenis.current?.scrollTo(scrollPosition, { lerp: 0.2, duration: 0.03, lock: true, force: true });
    }
  };

  /** Component */
  return (
    <div className='filmDatabase'>
      <FDHeader />
      <FDHero />
      <main
        className='fdMedia'
        ref={fdMediaRef}
        onWheel={(event: React.WheelEvent<HTMLElement>) => {
          event.preventDefault();
          requestAnimationFrame(raf);
          deltaScrollCarousels(event.deltaY);
        }}>
        {...carouselComponents}
      </main>
    </div>
  );
};

export default FilmDatabase;
