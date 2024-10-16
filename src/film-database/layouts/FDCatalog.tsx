// Deps
import { useState } from 'react';
// Tmdb Api Data
import { Type_MovieGenre_Keys } from '../composables/tmdb-api/data/tmdbGenres';
import { Type_Tmdb_Api_Union } from '../composables/tmdb-api/types/TmdbDataTypes';
// Components
import FDDetails from '../features/details/FDDetails';
import FDiFrame from '../features/iframe/FDiFrame';
import FDMenu from '../features/menu/FDMenu';
import FDMedia from '../features/media/FDMedia';

const FDCatalog = () => {
  // SPA Routes (enables menu nav)
  const [route, setRoute] = useState<'home' | Type_MovieGenre_Keys>('home');
  // Menu
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // Data
  const [heroData, setHeroData] = useState<Type_Tmdb_Api_Union | null>(null);

  /** Component */
  return (
    <div className='fdCatalog'>
      <FDMenu setRoute={setRoute} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} heroData={heroData} />
      <FDDetails heroData={heroData} />
      <FDiFrame heroData={heroData} />
      <FDMedia route={route} isMenuOpen={isMenuOpen} setHeroData={setHeroData} />
    </div>
  );
};

export default FDCatalog;
