// Context
import { CatalogProvider } from '../context/CatalogContext';
// Features
import FDMenu from '../features/catalog/menu/FDMenu';
import FDHero from '../features/catalog/hero/FDHero';
import FDMedia from '../features/catalog/media/FDMedia';

const FDCatalog = () => {
  return (
    <div className='filmDatabase' data-layout-carousel>
      <div className='fdCatalog'>
        <CatalogProvider>
          <FDMenu />
          <FDHero />
          <FDMedia />
        </CatalogProvider>
      </div>
    </div>
  );
};

export default FDCatalog;
