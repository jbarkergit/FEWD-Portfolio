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
import FDFooter from '../components/footer/FDFooter';
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

    if (!isKeyInMap) {
      console.error(`Failure to retrieve data for ${key}. Please ensure you're fetching it.`);
      return null;
    }

    const getPaginatedData: Type_Tmdb_Api_Union[][] | undefined = tmdbDataMap.get(key);
    if (!getPaginatedData) return null;

    return <FDCarousel dataKey={key} mapValue={getPaginatedData} maxVisibleCarouselNodes={maxVisibleCarouselNodes} />;
  };

  /** Component */
  return (
    <div className='filmDatabase'>
      <FDHeader />
      <main className='fdMedia' ref={fdMediaRef}>
        {createComponentByMapKey('now_playing')}
        {createComponentByMapKey('upcoming')}
      </main>
    </div>
  );
};

export default FilmDatabase;
