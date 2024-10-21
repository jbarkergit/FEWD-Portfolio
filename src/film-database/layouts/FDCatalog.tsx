// Deps
import { useEffect, useState } from 'react';
// Composables
import { Type_MovieGenre_Keys } from '../composables/tmdb-api/data/tmdbGenres';
import { Type_Tmdb_Discover_Response, Type_Tmdb_Prefabs_Response, Type_Tmdb_Response_Union, useTmdbFetcher } from '../composables/tmdb-api/hooks/useTmdbFetcher';
// Features
import FDDetails from '../features/details/FDDetails';
import FDiFrame from '../features/iframe/FDiFrame';
import FDMenu from '../features/menu/FDMenu';
import FDMedia from '../features/media/FDMedia';

const FDCatalog = () => {
  // SPA Routes (enables menu nav)
  const [route, setRoute] = useState<'home' | Type_MovieGenre_Keys>('home');
  // Menu
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // Details, trailer data
  const [heroData, setHeroData] = useState<Type_Tmdb_Response_Union | undefined>(undefined);
  // Carousel data
  const [carouselData, setCarouselData] = useState<Type_Tmdb_Prefabs_Response[] | Type_Tmdb_Discover_Response | undefined>(undefined);

  /** Fetch data when user requests a route */
  const fetchDataByRoute = async (): Promise<void> => {
    const homeData = (await useTmdbFetcher([
      { key: 'now_playing' },
      { key: 'upcoming' },
      { key: 'trending_today' },
      { key: 'trending_this_week' },
    ])) as Type_Tmdb_Prefabs_Response[];

    const routeData = (await useTmdbFetcher({ key: 'discover', args: { genre: 'comedy' as Type_MovieGenre_Keys } })) as Type_Tmdb_Discover_Response;

    setCarouselData(route === 'home' ? homeData : routeData);
  };

  useEffect(() => {
    fetchDataByRoute();
  }, [route]);

  /** Component */
  return (
    <div className='fdCatalog'>
      {/* <FDMenu setRoute={setRoute} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} heroData={heroData} /> */}
      {/* <FDDetails heroData={heroData} /> */}
      {/* <FDiFrame heroData={heroData} /> */}
      {/* <FDMedia isMenuOpen={isMenuOpen} setHeroData={setHeroData} carouselData={carouselData} /> */}
    </div>
  );
};

export default FDCatalog;
