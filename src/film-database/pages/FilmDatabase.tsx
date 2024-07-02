import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Api Types
import { Type_Tmdb_Api_Union } from '../composables/tmdb-api/types/TmdbDataTypes';
import { Type_MovieGenre_Keys } from '../composables/tmdb-api/data/tmdbMovieGenres';
// Api Hooks
import { useFetchTmdbResponse } from '../composables/tmdb-api/hooks/useFetchTmdbResponse';
import { useFilmDatabaseWebStorage } from '../composables/web-storage-api/useFilmDatabaseWebStorage';
import { useTmdbUrlBuilder } from '../composables/tmdb-api/hooks/useTmdbUrlBuilder';
import { useTmdbGenres } from '../composables/tmdb-api/hooks/useTmdbGenres';
// Features
import FDDetails from '../features/details/FDDetails';
import FDiFrame from '../features/iframe/FDiFrame';
import FDMenu from '../features/menu/FDMenu';
import FDMediaCarousel from '../features/media/FDMediaCarousel';
import FDCarousel from '../components/carousel/FDCarousel';

const FilmDatabase = () => {
  // Spa navigation state
  const [route, setRoute] = useState<Type_MovieGenre_Keys | undefined>(undefined);

  // Cross-origin safety layer
  const useLocationPathname = useLocation().pathname;

  /** Assign fetch data based on state route */
  const gatherDataByRoute = () => {
    // Init key-endpoint pair arr, store key-endpoint pairs
    let keyEndpointPairArr: ReturnType<typeof useTmdbUrlBuilder>[];

    // Assign keyEndpointPairArr
    if (route !== undefined) {
      const routeId: number = useTmdbGenres().id(route as Type_MovieGenre_Keys);
      keyEndpointPairArr = [useTmdbUrlBuilder('discover', [{ genre: routeId }])];
    } else {
      keyEndpointPairArr = [
        useTmdbUrlBuilder('now_playing'),
        useTmdbUrlBuilder('upcoming'),
        useTmdbUrlBuilder('trending_today'),
        useTmdbUrlBuilder('trending_this_week'),
      ];
    }

    fetchDesiredData(keyEndpointPairArr as { key: string; endpoint: string }[]);
  };

  useEffect(() => gatherDataByRoute(), [route]);

  /** Fetch data */
  const fetchDesiredData = (keyEndpointPairArr: { key: string; endpoint: string }[]) => {
    // Prevent unnecessary api calls(keyEndpointPair): Store data in place of endpoint if it exists in sessionStorage via mutation
    const sessionSafeKeyEndpointPairArr = keyEndpointPairArr.map((entry) => {
      const getCachedDataByKey: Type_Tmdb_Api_Union[] | undefined = useFilmDatabaseWebStorage(useLocationPathname).getData(entry.key);
      const isKeyCached: boolean = !!getCachedDataByKey;

      if (entry.key !== 'discover' && isKeyCached && getCachedDataByKey && getCachedDataByKey.length > 0) {
        return { key: entry.key, endpoint: getCachedDataByKey };
      } else {
        return entry;
      }
    });

    // Fetch, pass data to pagination
    useFetchTmdbResponse(sessionSafeKeyEndpointPairArr).then((data) => {
      if (data) {
        paginateData(data);
        // Prevent unnecessary api calls(session storage safeguard)
        data.forEach((entry) => useFilmDatabaseWebStorage(useLocationPathname).setData(entry.key, entry.endpoint));
      }
    });
  };

  /** Carousel components, hero data, pagination */
  const [carouselComponents, setCarouselComponents] = useState<JSX.Element[]>([]);
  const [heroData, setHeroData] = useState<Type_Tmdb_Api_Union | null>(null);

  const paginateData = (data: { key: string; endpoint: Type_Tmdb_Api_Union[] }[] | undefined) => {
    const maxVisibleCarouselNodes: number = 7;

    // Init mutatable map in outter scope (helps reduce state updates)
    let dataMap: Map<string, Type_Tmdb_Api_Union[][]> = new Map([]);

    if (data)
      data.forEach(({ key, endpoint }) => {
        // Init entry with empty array or unpaginated data for pages
        dataMap.set(key, []);

        // Pagination iteration dependency calculation
        const maxIteratorIndex: number = Math.ceil((endpoint.length - 1) / maxVisibleCarouselNodes);

        // Pagination
        for (let iteratorCounter = 0; iteratorCounter < maxIteratorIndex; iteratorCounter++) {
          const startingSliceIndex: number = maxVisibleCarouselNodes * iteratorCounter + iteratorCounter;
          const endingSliceIndex: number = maxVisibleCarouselNodes * (iteratorCounter + 1) + 1;
          const paginatedData: Type_Tmdb_Api_Union[] = endpoint.slice(startingSliceIndex, endingSliceIndex);

          const iterableMap: Type_Tmdb_Api_Union[][] = dataMap.get(key)!;
          iterableMap.push(paginatedData);
        }
      });

    // JSX carousel component creation
    const dataEntries: JSX.Element[] = [...dataMap.entries()].map(([key, value]) => (
      <FDCarousel key={key} dataKey={key} mapValue={value} maxVisibleCarouselNodes={maxVisibleCarouselNodes} setHeroData={setHeroData} />
    ));

    setCarouselComponents(dataEntries);
    // Create hero data
    if (data) setHeroData(data![0].endpoint[0]);
  };

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

    setLayoutAttr((prevLayout) => {
      if (prevLayout !== layout) {
        return layout;
      } else {
        return prevLayout;
      }
    });
  };

  useEffect(() => {
    getDataLayout();
    window.addEventListener('resize', getDataLayout);
    return () => window.removeEventListener('resize', getDataLayout);
  }, []);

  /** Component */
  return (
    <div className='filmDatabase' data-layout-carousel={layoutAttr}>
      <FDMenu setRoute={setRoute} />
      <FDDetails heroData={heroData} />
      <FDiFrame heroData={heroData} />
      <FDMediaCarousel carouselComponents={carouselComponents} />
    </div>
  );
};

export default FilmDatabase;
