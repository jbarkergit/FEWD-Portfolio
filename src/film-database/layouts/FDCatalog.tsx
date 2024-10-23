// Deps
import { useEffect, useState } from 'react';
// Composables
import { tmdbMovieGenres, Type_MovieGenre_Keys } from '../composables/tmdb-api/data/tmdbGenres';
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

  async function test() {
    const data = await useTmdbFetcher({ key: 'search', args: { search: 'deadpool' } });
    console.log(data);
  }

  useEffect(() => {
    test();
  }, []);

  /** Component */
  return (
    <div className='fdCatalog'>
      {/* <FDMenu setRoute={setRoute} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} heroData={heroData} /> */}
      {/* <FDDetails heroData={heroData} /> */}
      {/* <FDiFrame heroData={heroData} /> */}
      {/* <FDMedia route={route} isMenuOpen={isMenuOpen} setHeroData={setHeroData} /> */}
    </div>
  );
};

export default FDCatalog;
