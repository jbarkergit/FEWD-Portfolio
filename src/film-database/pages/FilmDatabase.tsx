import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Api Data
import { Type_Tmdb_Movie_Keys_Union, tmdbMovieEndpoints } from '../composables/tmdb-api/data/tmdbEndPoints';
// Api Types
import { Type_Tmdb_Api_Union } from '../composables/tmdb-api/types/TmdbDataTypes';
// Api Hooks
import { Type_useFetchTmdbResponse_KeyValuePairArr, useFetchTmdbResponse } from '../composables/tmdb-api/hooks/useFetchTmdbResponse';
import { useFilmDatabaseWebStorage } from '../composables/web-storage-api/useFilmDatabaseWebStorage';
// Features
import FDDetails from '../features/details/FDDetails';
import FDiFrame from '../features/iframe/FDiFrame';
import FDMenu from '../features/menu/FDMenu';
import FDMediaCarousel from '../features/media/FDMediaCarousel';
import FDCarousel from '../components/carousel/FDCarousel';

// const maxCarouselNodes: number = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--my-variable')); revisit

const FilmDatabase = () => {
  // State map holding [key, [unpaginated data, paginated data arrs]]
  const [tmdbDataMap, setTmdbDataMap] = useState<Map<string, Type_Tmdb_Api_Union[][]>>(new Map());
  // Global dependencies
  const filmDatabaseRef = useRef<HTMLDivElement>(null);
  const [maxVisibleCarouselNodes, setMaxVisibleCarouselNodes] = useState<number>(7);

  const getMaxVisibleCarouselNodes = () => {
    if (!filmDatabaseRef.current) return;
    const globalVar: number = parseInt(getComputedStyle(filmDatabaseRef.current).getPropertyValue('--fd-carousel-items-per-page').trim());
    if (maxVisibleCarouselNodes !== globalVar) setMaxVisibleCarouselNodes(globalVar);
  };

  useEffect(() => {
    window.addEventListener('resize', getMaxVisibleCarouselNodes);
    return () => window.removeEventListener('resize', getMaxVisibleCarouselNodes);
  }, []);

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
    let keyEndpointPairArr: [Type_Tmdb_Movie_Keys_Union, string | Type_Tmdb_Api_Union[]][] = [];

    // Assign keyEndpointPairArr
    switch (useLocationPathname) {
      case '/film-database':
        keyEndpointPairArr = [getMapEntry('now_playing'), getMapEntry('upcoming'), getMapEntry('trending_today'), getMapEntry('trending_this_week')];
        break;

      default:
        keyEndpointPairArr = [];
        break;
    }

    // Prevent unnecessary api calls(keyEndpointPair): Store data in place of endpoint if it exists in sessionStorage
    keyEndpointPairArr.forEach((keyEndpointPair) => {
      const getCachedDataByKey: Type_Tmdb_Api_Union[] | undefined = useFilmDatabaseWebStorage(useLocationPathname).getData(keyEndpointPair[0]);
      const isKeyCached: boolean = !!getCachedDataByKey;
      if (isKeyCached && getCachedDataByKey!.length > 0) keyEndpointPair[1] = getCachedDataByKey!;
    });

    // Fetch, pass data to pagination
    useFetchTmdbResponse(keyEndpointPairArr).then((data) => {
      if (data) {
        paginateData(data);

        // Prevent unnecessary api calls(session storage safeguard)
        data.forEach((entry) => useFilmDatabaseWebStorage(useLocationPathname).setData(entry[0], entry[1]));
      }
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
        return <FDCarousel dataKey={key} mapValue={value} maxVisibleCarouselNodes={maxVisibleCarouselNodes} setHeroData={setHeroData} />;
      });
    };

    setCarouselComponents(tmdbStateComponents());
  }, [tmdbDataMap]);

  /** Hero component */
  const [heroData, setHeroData] = useState<Type_Tmdb_Api_Union | null>(null);

  // Init hero
  useEffect(() => {
    if (!tmdbDataMap) return;
    const tmdbValueFlatMap = [...tmdbDataMap.values()];

    if (tmdbValueFlatMap[0]) setHeroData(tmdbValueFlatMap[0][0][0]);
  }, [tmdbDataMap]);

  /** filmDatabase Breakpoint Attr
   * Breakpoints at 25% of second row's poster
   */
  const [layoutAttr, setLayoutAttr] = useState<string>('xxl');

  const getDataLayout = (): void => {
    let layout: string;

    switch (true) {
      case window.innerWidth >= 1410:
        layout = 'xxl';
        break;

      case window.innerWidth < 1410 && window.innerWidth > 1212:
        layout = 'xl';
        break;

      case window.innerWidth <= 1212 && window.innerWidth > 1032:
        layout = 'l';
        break;

      case window.innerWidth <= 1032 && window.innerWidth > 836:
        layout = 'm';
        break;

      case window.innerWidth <= 836 && window.innerWidth > 632:
        layout = 's';
        break;

      case window.innerWidth <= 632 && window.innerWidth > 0:
        layout = 'xs';
        break;

      default:
        layout = 'xxl';
        break;
    }

    // if (layout !== layoutAttr)
    setLayoutAttr(layout);
  };

  useEffect(() => {
    getDataLayout();
    window.addEventListener('resize', getDataLayout);
    return () => window.removeEventListener('resize', getDataLayout);
  }, []);

  /** Component */
  return (
    <div className='filmDatabase' ref={filmDatabaseRef} data-layout-carousel={layoutAttr}>
      <FDMenu />
      <FDDetails heroData={heroData} />
      <FDiFrame heroData={heroData} />
      <FDMediaCarousel carouselComponents={carouselComponents} />
    </div>
  );
};

export default FilmDatabase;
