// Context
import { CatalogProvider } from '../context/CatalogContext';
// Features
import FDDetails from '../features/details/FDDetails';
import FDiFrame from '../features/iframe/FDiFrame';
import FDMenu from '../features/menu/FDMenu';
import FDMedia from '../features/media/FDMedia';

const FDCatalog = () => {
  return (
    <div className='filmDatabase' data-layout-carousel>
      <div className='fdCatalog'>
        <CatalogProvider>
          <FDMenu />
          <FDDetails />
          <FDiFrame />
          <FDMedia />
        </CatalogProvider>
      </div>
    </div>
  );
};

export default FDCatalog;
