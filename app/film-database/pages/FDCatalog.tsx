import { CatalogProvider } from '../context/CatalogContext';
// Features
import FDHeader from '../features/catalog/header/FDHeader';
import FDHero from '../features/catalog/hero/FDHero';
import FDMedia from '../features/catalog/media/FDMedia';
import FDMovieModal from '../features/catalog/modals/FDMovieModal';

const FDCatalog = () => {
  return (
    <CatalogProvider>
      <div className='filmDatabase'>
        <FDHeader />
        <div className='fdCatalog' data-layout-carousel>
          <FDHero />
          <FDMedia />
          <FDMovieModal />
        </div>
      </div>
    </CatalogProvider>
  );
};

export default FDCatalog;
