import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Api Types
import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';
import { Type_MovieGenre_Keys } from '../../composables/tmdb-api/data/tmdbMovieGenres';
// Api Hooks
import { useFetchTmdbResponse } from '../../composables/tmdb-api/hooks/useFetchTmdbResponse';
import { useFilmDatabaseWebStorage } from '../../composables/web-storage-api/useFilmDatabaseWebStorage';
import { useTmdbUrlBuilder } from '../../composables/tmdb-api/hooks/useTmdbUrlBuilder';
import { useTmdbGenres } from '../../composables/tmdb-api/hooks/useTmdbGenres';
// Features
import FDDetails from '../../features/details/FDDetails';
import FDiFrame from '../../features/iframe/FDiFrame';
import FDMenu from '../../features/menu/FDMenu';
import FDMediaCarousel from '../../features/media/FDMediaCarousel';
import FDCarousel from '../../components/carousel/FDCarousel';
import FDUserAccount from '../user-account/FDUserAccount';

const FDCatalog = () => {
  // Spa navigation state
  const [route, setRoute] = useState<'home' | 'userAccount' | Type_MovieGenre_Keys>('userAccount');

  // Cross-origin safety layer
  const useLocationPathname = useLocation().pathname;

  // User location pathname based routing
  useEffect(() => {
    switch (useLocationPathname) {
      case '/film-database':
        setRoute('userAccount');
        break;

      case '/film-database/home':
        setRoute('home');
        break;

      default:
        setRoute('userAccount');
        break;
    }
  }, [useLocationPathname]);

  /** Assign fetch data based on state route */
  const gatherDataByRoute = () => {
    // Init key-endpoint pair arr, store key-endpoint pairs
    let keyEndpointPairArr: ReturnType<typeof useTmdbUrlBuilder>[];

    // Assign keyEndpointPairArr
    switch (route) {
      case 'home':
        keyEndpointPairArr = [
          useTmdbUrlBuilder('now_playing'),
          useTmdbUrlBuilder('upcoming'),
          useTmdbUrlBuilder('trending_today'),
          useTmdbUrlBuilder('trending_this_week'),
        ];
        break;

      case 'userAccount':
        keyEndpointPairArr = [useTmdbUrlBuilder('discover', [{ genre: 'family' }])];
        break;

      default:
        keyEndpointPairArr = [useTmdbUrlBuilder('discover', [{ genre: route }])];
        break;
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

      if (isKeyCached && getCachedDataByKey && getCachedDataByKey.length > 0) {
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
    const dataEntries: JSX.Element[] = [...dataMap.entries()].map(([key, value], index) => (
      <FDCarousel
        mapIndex={index}
        key={key}
        route={route}
        dataKey={key}
        mapValue={value}
        maxVisibleCarouselNodes={maxVisibleCarouselNodes}
        setHeroData={setHeroData}
      />
    ));

    setCarouselComponents(dataEntries);
    // Create hero data
    if (data) setHeroData(data![0].endpoint[0]);
  };

  /** Menu */
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  /** Component */
  return (
    <div className='fdCatalog'>
      <FDMenu setRoute={setRoute} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <FDDetails heroData={heroData} />
      <FDiFrame heroData={heroData} />
      <FDMediaCarousel carouselComponents={carouselComponents} isMenuOpen={isMenuOpen} />
    </div>
  );
};

export default FDCatalog;
