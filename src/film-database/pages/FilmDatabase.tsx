import { ReactElement, ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';
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
import FDFooter from '../components/footer/FDFooter';
import FDHero from '../components/hero/FDHero';
import FDCarouselSkeleton from '../components/carousel/FDCarouselSkeleton';
// Types
export type Type_PaginatedDataMap = Map<string, Type_Tmdb_Api_Union[]>;

const FilmDatabase = () => {
  // References
  const fdMediaRef = useRef<HTMLElement>(null);
  const carouselUlRefReceiver = useRef<HTMLUListElement>(null);
  const carouselUlRef = carouselUlRefReceiver;

  // Global Variables
  const useLocationPathname = useLocation().pathname;

  /** Fetch and set data */
  const [tmdbDataArr, setTmdbDataArr] = useState<Type_PaginatedDataMap | undefined>(undefined);

  useEffect(() => {
    // Fetch data based on the user's location (will change when state navigation is implemented)
    let keyValuePairArr: [string, string][] = [];

    switch (useLocationPathname) {
      case '/film-database/genre/horror':
        keyValuePairArr = [];
        break;

      default:
        keyValuePairArr = Array.from(tmdbMovieEndpoints.theatrical.entries());
        break;
    }

    // Initialize fetch, set state
    useFetchTmdbResponse({ endPoint_keyValuePairArr: keyValuePairArr }).then((data) => {
      if (!data) return;
      const dataMap: Type_PaginatedDataMap = new Map();
      data.forEach(([key, value]) => dataMap.set(key, value));
      setTmdbDataArr(dataMap);
    });
  }, []);

  /** Initial data pagination */
  const [paginatedData, setPaginatedData] = useState<Type_PaginatedDataMap>(new Map());
  const [visibleNodesCount, setVisibleNodesCount] = useState<number>(8);

  const paginateTmdbDataArrOnMount = () => {
    let dataMap: Type_PaginatedDataMap = new Map();

    if (tmdbDataArr) {
      Array.from(tmdbDataArr?.entries()).forEach(([key, dataArr]) => dataMap.set(key, dataArr.slice(0, visibleNodesCount)));
      setPaginatedData(dataMap);
    }
  };

  useEffect(() => paginateTmdbDataArrOnMount(), [tmdbDataArr]);

  /** Carousel Visible Nodes State
   * Employed observers to watch for visible children nodes of carouselUl.current
   * Note: Intersectional Observer does not detect changes that may occur
   * Employment of Mutation Observer is required to ensure our observations are concurrent
   * Note: State may seem unnecessary; however, it's important to update the visible node count due to viewport sizing to refire our logic to force a rerender
   */

  const observeCarouselNodes = () => {
    const observer: IntersectionObserver = new IntersectionObserver(
      // Filter entries that are intersecting (visible in DOM), pass length to state
      (entries: IntersectionObserverEntry[]) => {
        const filteredEntriesLength: number = entries.filter((entry: IntersectionObserverEntry) => entry.isIntersecting).length;
        if (filteredEntriesLength > 0) setVisibleNodesCount(filteredEntriesLength);
      },
      // Observer OPTS Note: Threshold is set to .2 to ensure we're observing ALL visible nodes; partial or not.
      { root: carouselUlRef.current, rootMargin: '0px', threshold: 0.2 }
    );

    // Observe each list-item node of the first carousel
    const observeNodes = () => {
      if (carouselUlRef.current && carouselUlRef.current.children) {
        Array.from(carouselUlRef.current.children).forEach((node) => observer.observe(node));
      }
    };

    // Initial observation
    observeNodes();

    // Re-observe when carouselUlRef.current changes e.g. when media queries change the amount of visible nodes
    const mutationObserver: MutationObserver = new MutationObserver(observeNodes);
    if (carouselUlRef.current) mutationObserver.observe(carouselUlRef.current, { childList: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  };

  useEffect(() => observeCarouselNodes(), [carouselUlRef.current?.children]);

  /** Component props context */
  const componentProps = {
    fdMediaRef: fdMediaRef,
    // ref: carouselUlRefReceiver,
    carouselUlRef: carouselUlRef,
    tmdbDataArr: tmdbDataArr,
    visibleNodesCount: visibleNodesCount,
  };

  const ComponentPropsContext = createContext<typeof componentProps>(componentProps);

  const ComponentPropsProvider = ({ children }: { children?: ReactNode }): ReactElement => {
    return <ComponentPropsContext.Provider value={componentProps}>{children}</ComponentPropsContext.Provider>;
  };

  const useComponentProps = useContext(ComponentPropsContext);

  /** Get paginated data by key (autofill provided) */
  const createComponentByMapKey = (key: Type_Tmdb_Movie_Keys_Union): JSX.Element | null => {
    const isKeyInMap: boolean = paginatedData.has(key);

    if (!isKeyInMap) {
      return null;
    } else {
      const getPaginatedData: Type_Tmdb_Api_Union[] | undefined = paginatedData.get(key);

      switch (getPaginatedData) {
        case undefined:
          return <FDCarouselSkeleton />;
        default:
          return <FDCarousel dataKey={key} dataArr={getPaginatedData} useComponentProps={useComponentProps} />;
      }
    }
  };

  /** Component */
  return (
    <div className='filmDatabase'>
      <FDHeader />
      <main className='fdMedia' ref={fdMediaRef}>
        <ComponentPropsProvider>{createComponentByMapKey('now_playing')}</ComponentPropsProvider>
      </main>
    </div>
  );
};

export default FilmDatabase;
