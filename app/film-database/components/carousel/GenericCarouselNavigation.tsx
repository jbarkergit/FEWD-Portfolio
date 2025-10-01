import { useRef, useCallback, useEffect } from 'react';
import { IcBaselineArrowLeft, IcBaselineArrowRight } from '~/film-database/assets/svg/icons';
import { useModalContext } from '~/film-database/context/ModalContext';
import { useVisibleCountContext } from '~/film-database/context/VisibleCountContext';

const navigateGenericCarousel = (reference: HTMLUListElement | null, dataLength: number): ((delta: number) => void) => {
  const { visibleCount } = useVisibleCountContext();
  const { modal } = useModalContext();
  const itemsCount = modal === undefined ? visibleCount.viewport : visibleCount.modal;
  const carouselIndexRef = useRef<number>(0);

  const navigate = useCallback((): void => {
    if (reference instanceof HTMLUListElement) {
      const listItems: HTMLCollection = reference.children;
      const targetIndex: number = carouselIndexRef.current * itemsCount;

      let targetElement: HTMLLIElement | null = listItems[targetIndex] as HTMLLIElement;
      if (!targetElement) targetElement = listItems[listItems.length - 1] as HTMLLIElement;

      const carouselPosition: number = reference.offsetLeft;
      const scrollPosition: number = targetElement.offsetLeft - carouselPosition;

      const firstItem = listItems[0] as HTMLLIElement | HTMLDivElement;
      const carouselMargin: number = parseInt(firstItem.style.marginLeft.trim());

      const newScrollPosition: number =
        targetIndex === 0
          ? scrollPosition - carouselMargin
          : targetIndex >= listItems.length
            ? scrollPosition + carouselMargin
            : scrollPosition;

      reference.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
    }
  }, [itemsCount, reference]);

  const updateCarouselIndex = useCallback(
    (delta: number): void => {
      const maxIndex = Math.ceil(dataLength / itemsCount) - 1;
      carouselIndexRef.current = Math.max(0, Math.min(carouselIndexRef.current + delta, maxIndex));
      navigate();
    },
    [dataLength, itemsCount, navigate]
  );

  useEffect(() => updateCarouselIndex(0), [itemsCount]);

  return updateCarouselIndex;
};

type Props = {
  dataLength: number;
  reference: HTMLUListElement | null;
};

const GenericCarouselNavigation = ({ dataLength, reference }: Props) => {
  const updateCarouselIndex = navigateGenericCarousel(reference, dataLength);

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
