import { IcBaselineArrowLeft, IcBaselineArrowRight } from '~/film-database/assets/svg/icons';

type Props = { updateCarouselIndex: (delta: number) => void };

const FDCollectionsNavigation = ({ updateCarouselIndex }: Props) => {
  return (
    <nav>
      <button aria-label={'Show Previous'} onClick={() => updateCarouselIndex(-1)}>
        <IcBaselineArrowLeft />
      </button>
      <button aria-label={'Show More'} onClick={() => updateCarouselIndex(1)}>
        <IcBaselineArrowRight />
      </button>
    </nav>
  );
};

export default FDCollectionsNavigation;
