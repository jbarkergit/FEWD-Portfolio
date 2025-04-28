import FDHero from './hero/FDHero';
import FDMedia from './media/FDMedia';
import FDModal from './modals/container/FDModal';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';

const FDCatalog = () => {
  const { root } = useCatalogProvider();

  return (
    <div className='fdCatalog' ref={root} data-layout-carousel data-layout-collection>
      <FDHero />
      <FDMedia />
      <FDModal />
    </div>
  );
};

export default FDCatalog;
