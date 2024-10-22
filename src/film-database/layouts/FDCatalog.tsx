// Deps
import { useEffect, useState } from 'react';
// Composables
import { Type_MovieGenre_Keys } from '../composables/tmdb-api/data/tmdbGenres';
import { Namespace_Tmdb, useTmdbFetcher } from '../composables/tmdb-api/hooks/useTmdbFetcher';
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
  const [heroData, setHeroData] = useState<Namespace_Tmdb.Response_Union | undefined>(undefined);
  // Carousel data
  const [carouselData, setCarouselData] = useState<Namespace_Tmdb.Prefabs_Obj[] | Namespace_Tmdb.Discover_Obj | undefined>(undefined);

  /** Fetch data when user requests a route */
  type Prefabs_Obj_isUndefined = Namespace_Tmdb.Prefabs_Obj | undefined;

  const fetchDataByRoute = async (): Promise<void> => {
    const homeData = (await useTmdbFetcher([{ key: 'now_playing' }, { key: 'upcoming' }, { key: 'trending_today' }, { key: 'trending_this_week' }])) as
      | Namespace_Tmdb.Prefabs_Obj[]
      | Prefabs_Obj_isUndefined[];

    const routeData = (await useTmdbFetcher({ key: 'discover', args: { genre: 'comedy' as Type_MovieGenre_Keys } })) as Namespace_Tmdb.Discover_Obj | undefined;

    if (route === 'home') {
      const filteredHomeData = homeData.filter((obj) => obj !== undefined) as Namespace_Tmdb.Prefabs_Obj[];
      setCarouselData(filteredHomeData);
    } else {
      setCarouselData(routeData);
    }
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
      <FDMedia isMenuOpen={isMenuOpen} setHeroData={setHeroData} carouselData={carouselData} />
    </div>
  );
};

export default FDCatalog;
