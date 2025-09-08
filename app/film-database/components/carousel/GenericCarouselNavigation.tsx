import { IcBaselineArrowLeft, IcBaselineArrowRight } from '~/film-database/assets/svg/icons';
import { navigateGenericCarousel } from '~/film-database/components/carousel/navigateGenericCarousel';
import { useChunkSize } from '~/film-database/context/ChunkSizeContext';

type Props = {
  dataLength: number;
  chunkSizePref: 'viewport' | 'modal';
  reference: HTMLUListElement | null;
};

const GenericCarouselNavigation = ({ dataLength, chunkSizePref, reference }: Props) => {
  const { chunkSize } = useChunkSize();

  /**
   * @function useCarouselNavigation
   * @description Hook that handles navigation for all carousels across the application
   */
  const updateCarouselIndex = navigateGenericCarousel(
    reference,
    chunkSizePref === 'viewport' ? chunkSize.viewport : chunkSize.modal,
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
