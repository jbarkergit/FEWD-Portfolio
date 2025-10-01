import { useRef, useCallback, useEffect } from 'react';
import { IcBaselineArrowLeft, IcBaselineArrowRight } from '~/film-database/assets/svg/icons';
import { useModalContext } from '~/film-database/context/ModalContext';
import { useVisibleCountContext } from '~/film-database/context/VisibleCountContext';

type Props = {
  dataLength: number;
  reference: HTMLUListElement | null;
};

const GenericCarouselNavigation = ({ dataLength, reference }: Props) => {
  const { visibleCount } = useVisibleCountContext();
  const { modal } = useModalContext();

  const itemsPerPage = modal === undefined ? visibleCount.viewport : visibleCount.modal;
  const indexRef = useRef(0);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!reference) return;

      const listItems = Array.from(reference.children) as HTMLElement[];
      if (listItems.length === 0) return;

      const targetIndex = Math.min(index * itemsPerPage, listItems.length - 1);
      const targetEl = listItems[targetIndex];
      if (!targetEl) return;

      const firstItem = listItems[0];
      if (!firstItem) return;

      const marginLeft = parseInt(getComputedStyle(firstItem).marginLeft, 10) || 0;

      const scrollPosition = targetEl.offsetLeft - reference.offsetLeft;

      const adjustedScroll =
        targetIndex === 0
          ? scrollPosition - marginLeft
          : targetIndex >= listItems.length
            ? scrollPosition + marginLeft
            : scrollPosition;

      reference.scrollTo({ left: adjustedScroll, behavior: 'smooth' });
    },
    [itemsPerPage, reference]
  );

  const navigate = useCallback(
    (delta: number) => {
      const maxIndex = Math.ceil(dataLength / itemsPerPage) - 1;
      indexRef.current = Math.max(0, Math.min(indexRef.current + delta, maxIndex));
      scrollToIndex(indexRef.current);
    },
    [itemsPerPage]
  );

  // Re-align when itemsPerPage changes (resize)
  useEffect(() => {
    indexRef.current = 0;
    navigate(0);
  }, [itemsPerPage]);

  return (
    <nav className='genericCarousel__wrapper__navigation'>
      <button
        className='genericCarousel__wrapper__navigation--button'
        aria-label='Show Previous'
        onPointerUp={() => navigate(-1)}>
        <IcBaselineArrowLeft />
      </button>
      <button
        className='genericCarousel__wrapper__navigation--button'
        aria-label='Show More'
        onPointerUp={() => navigate(1)}>
        <IcBaselineArrowRight />
      </button>
    </nav>
  );
};

export default GenericCarouselNavigation;
