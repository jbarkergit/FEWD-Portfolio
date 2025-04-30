/**
 * @function useCarouselNavigation
 * @description Carousel scroll functionality
 */

import { useRef, useCallback, useEffect, type RefObject } from 'react';

type Props = {
  reference: RefObject<HTMLUListElement | null>;
  chunkSize: number;
  dataLength: number;
};

export const useCarouselNavigation = ({ reference, chunkSize, dataLength }: Props): ((delta: number) => void) => {
  const carouselIndexRef = useRef(0);

  const navigate = useCallback((): void => {
    if (reference.current instanceof HTMLUListElement) {
      const listItems: HTMLCollection = reference.current.children;
      const targetIndex: number = carouselIndexRef.current * chunkSize;

      let targetElement: HTMLLIElement | null = listItems[targetIndex] as HTMLLIElement;
      if (!targetElement) targetElement = listItems[listItems.length - 1] as HTMLLIElement;

      const carouselPosition: number = reference.current.offsetLeft;
      const scrollPosition: number = targetElement.offsetLeft - carouselPosition;

      const firstItem = listItems[0] as HTMLLIElement | HTMLDivElement;
      const carouselMargin: number = parseInt(firstItem.style.marginLeft.trim());

      const newScrollPosition: number =
        targetIndex === 0 ? scrollPosition - carouselMargin : targetIndex >= listItems.length ? scrollPosition + carouselMargin : scrollPosition;

      reference.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
    } else {
      console.log('no' + reference);
    }
  }, [chunkSize, reference]);

  const updateCarouselIndex = useCallback(
    (delta: number): void => {
      carouselIndexRef.current = Math.max(0, Math.min(carouselIndexRef.current + delta, dataLength));
      navigate();
    },
    [dataLength, navigate, reference]
  );

  useEffect(() => updateCarouselIndex(0), [chunkSize]);

  return updateCarouselIndex;
};
