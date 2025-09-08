import { useRootRef } from '~/film-database/context/RootRefContext';
import FDHero from './hero/FDHero';
import FDMedia from './media/FDMedia';
import FDModal from '~/film-database/features/catalog/modals/FDModal';

const FDCatalog = () => {
  const { root } = useRootRef();

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
