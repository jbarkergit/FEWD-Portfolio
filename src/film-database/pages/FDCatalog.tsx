// Context
import { CatalogProvider } from '../context/CatalogContext';
// Features
import FDMenu from '../features/catalog/menu/FDMenu';
import FDHero from '../features/catalog/hero/FDHero';
import FDMedia from '../features/catalog/media/FDMedia';

const FDCatalog = () => {
  return (
    <div className='filmDatabase'>
      <CatalogProvider>
        <div className='fdCatalog' data-layout-carousel>
          <FDHero />
          <FDMedia />
        </div>
        <FDMenu />
      </CatalogProvider>
    </div>
  );
};

export default FDCatalog;
