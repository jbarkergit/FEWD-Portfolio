import { useRootRefContext } from '~/film-database/context/RootRefContext';
import FDHero from './hero/FDHero';
import FDMedia from './media/FDMedia';
import FDModal from '~/film-database/features/catalog/modals/FDModal';
import { HeroDataProvider } from '~/film-database/context/HeroDataContext';
import { ModalTrailerProvider } from '~/film-database/context/ModalTrailerContext';
import { PersonProvider } from '~/film-database/context/PersonContext';
import { UserCollectionProvider } from '~/film-database/context/UserCollectionContext';
import { VisibleCountProvider } from '~/film-database/context/VisibleCountContext';

const FDCatalog = () => {
  const { root } = useRootRefContext();

  return (
    <HeroDataProvider>
      <UserCollectionProvider>
        <ModalTrailerProvider>
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
        </ModalTrailerProvider>
      </UserCollectionProvider>
    </HeroDataProvider>
  );
};

export default FDCatalog;
