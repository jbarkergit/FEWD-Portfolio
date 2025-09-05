import { IcBaselineArrowLeft, IcBaselineArrowRight } from '~/film-database/assets/svg/icons';
import { navigateGenericCarousel } from '~/film-database/components/carousel/navigateGenericCarousel';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';

type Props = {
  dataLength: number;
  chunkSize: 'viewport' | 'modal';
  reference: HTMLUListElement | undefined;
};

const GenericCarouselNavigation = ({ dataLength, chunkSize, reference }: Props) => {
  const { viewportChunkSize, modalChunkSize } = useCatalogProvider();

  /**
   * @function useCarouselNavigation
   * @description Hook that handles navigation for all carousels across the application
   */
  const updateCarouselIndex = navigateGenericCarousel(
    reference,
    chunkSize === 'viewport' ? viewportChunkSize : modalChunkSize,
    dataLength
  );

  return (
    <nav className='genericCarousel__wrapper__navigation'>
      <button
        className='genericCarousel__wrapper__navigation--button'
        aria-label={'Show Previous'}
        onPointerUp={() => updateCarouselIndex(-1)}>
        <IcBaselineArrowLeft />
      </button>
      <button
        className='genericCarousel__wrapper__navigation--button'
        aria-label={'Show More'}
        onPointerUp={() => updateCarouselIndex(1)}>
        <IcBaselineArrowRight />
      </button>
    </nav>
  );
};

export default GenericCarouselNavigation;
