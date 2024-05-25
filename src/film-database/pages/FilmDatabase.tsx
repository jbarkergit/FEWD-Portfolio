import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Api Data
import { Type_Tmdb_Movie_Keys_Union, tmdbMovieEndpoints } from '../composables/tmdb-api/data/tmdbEndPoints';
// Api Types
import { Type_Tmdb_Api_Union } from '../composables/tmdb-api/types/TmdbDataTypes';
// Api Hooks
import { useFetchTmdbResponse } from '../composables/tmdb-api/hooks/useFetchTmdbResponse';
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
          return (
            <FDCarousel
              dataKey={key}
              dataArr={getPaginatedData}
              fdMediaRef={fdMediaRef}
              tmdbDataArr={tmdbDataArr}
              visibleNodesCount={visibleNodesCount}
              setVisibleNodesCount={setVisibleNodesCount}
            />
          );
      }
    }
  };

  /** Component */
  return (
    <div className='filmDatabase'>
      <FDHeader />
      <main className='fdMedia' ref={fdMediaRef}>
        {createComponentByMapKey('now_playing')}
      </main>
    </div>
  );
};

export default FilmDatabase;
