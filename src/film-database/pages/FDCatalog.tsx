// Deps
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Tmdb Api Data
import { Type_MovieGenre_Keys } from '../composables/tmdb-api/data/tmdbGenres';
import { useFetchTmdbResponse } from '../composables/tmdb-api/hooks/useFetchTmdbResponse';
import { Type_Tmdb_Api_Union } from '../composables/tmdb-api/types/TmdbDataTypes';
// Tmdb Api Hooks
import { useTmdbUrlBuilder } from '../composables/tmdb-api/hooks/useTmdbUrlBuilder';
import { useFilmDatabaseWebStorage } from '../composables/web-storage-api/useFilmDatabaseWebStorage';
// Components
import FDDetails from '../features/details/FDDetails';
import FDiFrame from '../features/iframe/FDiFrame';
import FDMediaCarousel from '../features/media/FDMediaCarousel';
import FDMenu from '../features/menu/FDMenu';
import FDCarousel from '../components/carousel/FDCarousel';

const FDCatalog = () => {
  /** Global */
  // SPA Routes (enables menu nav)
  const [route, setRoute] = useState<'home' | Type_MovieGenre_Keys>('home');
  // Menu
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // Data
  const [carouselComponents, setCarouselComponents] = useState<JSX.Element[]>([]);
  const [heroData, setHeroData] = useState<Type_Tmdb_Api_Union | null>(null);
  // Cross-origin safety layer
  const pathname: string = useLocation().pathname;

  /** Assign fetch data based on state route */
  const gatherDataByRoute = () => {
    // Init key-endpoint pair arr, store key-endpoint pairs
    let keyEndpointPairArr: ReturnType<typeof useTmdbUrlBuilder>[];

    // Assign keyEndpointPairArr
    if (route === 'home') {
      keyEndpointPairArr = [
        useTmdbUrlBuilder('now_playing'),
        useTmdbUrlBuilder('upcoming'),
        useTmdbUrlBuilder('trending_today'),
        useTmdbUrlBuilder('trending_this_week'),
      ];
    } else {
      keyEndpointPairArr = [useTmdbUrlBuilder('discover', [{ genre: route }])];
    }

    fetchDesiredData(keyEndpointPairArr as { key: string; endpoint: string }[]);
  };

  useEffect(() => gatherDataByRoute(), [route]);

  /** Fetch data */
  const fetchDesiredData = (keyEndpointPairArr: { key: string; endpoint: string }[]) => {
    // Prevent unnecessary api calls(keyEndpointPair): Store data in place of endpoint if it exists in sessionStorage via mutation
    const sessionSafeKeyEndpointPairArr = keyEndpointPairArr.map((entry) => {
      const getCachedDataByKey: Type_Tmdb_Api_Union[] | undefined = useFilmDatabaseWebStorage(pathname).getData(entry.key);
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
        // Priority
        paginateData(data);
        // Prevent unnecessary api calls(session storage safeguard)
        data.forEach((entry) => useFilmDatabaseWebStorage(pathname).setData(entry.key, entry.endpoint));
      }
    });
  };

  /** Carousel components, hero data, pagination */
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
      <FDCarousel mapIndex={index} key={key} dataKey={key} mapValue={value} maxVisibleCarouselNodes={maxVisibleCarouselNodes} setHeroData={setHeroData} />
    ));

    setCarouselComponents(dataEntries);

    // Create hero data
    if (data) setHeroData(data![0].endpoint[0]);
  };

  /** Component */
  return (
    <div className='fdCatalog'>
      <FDMenu setRoute={setRoute} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} heroData={heroData} />
      <FDDetails heroData={heroData} />
      <FDiFrame heroData={heroData} />
      <FDMediaCarousel carouselComponents={carouselComponents} isMenuOpen={isMenuOpen} setHeroData={setHeroData} />
    </div>
  );
};

export default FDCatalog;
