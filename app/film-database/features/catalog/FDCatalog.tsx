import FDHero from './hero/FDHero';
import FDMedia from './media/FDMedia';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import FDModal from '~/film-database/features/catalog/modals/FDModal';

const FDCatalog = () => {
  const { root } = useCatalogProvider();

  return (
    <div
      className='fdCatalog'
      ref={root}
      data-layout-carousel
      data-layout-collection>
      <FDHero />
      <FDMedia />
      <FDModal />
    </div>
  );
};

export default FDCatalog;
