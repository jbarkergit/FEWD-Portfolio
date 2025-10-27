import { useRootRefContext } from '~/film-database/context/RootRefContext';
import FDHero from './hero/FDHero';
import FDMedia from './media/FDMedia';
import FDModal from '~/film-database/features/catalog/modals/FDModal';
import { PersonProvider } from '~/film-database/context/PersonContext';
import { VisibleCountProvider } from '~/film-database/context/VisibleCountContext';

const FDCatalog = () => {
  const { root } = useRootRefContext();

  return (
    <div
      className='fdCatalog'
      ref={root}
      data-layout-carousel
      data-layout-collection>
      <FDHero />
      <PersonProvider>
        <VisibleCountProvider>
          <FDMedia />
          <FDModal />
        </VisibleCountProvider>
      </PersonProvider>
    </div>
  );
};

export default FDCatalog;
