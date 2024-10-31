// Context
import { CatalogProvider } from '../context/CatalogContext';
// Provider
import { LayoutProvider } from '../context/LayoutProvider';
// Features
import FDDetails from '../features/details/FDDetails';
import FDiFrame from '../features/iframe/FDiFrame';
import FDMenu from '../features/menu/FDMenu';
import FDMedia from '../features/media/FDMedia';

const FDCatalog = () => {
  return (
    <LayoutProvider>
      <div className='fdCatalog'>
        <CatalogProvider>
          <FDMenu />
          <FDDetails />
          <FDiFrame />
          <FDMedia />
        </CatalogProvider>
      </div>
    </LayoutProvider>
  );
};

export default FDCatalog;
