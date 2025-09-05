import { useRef, useCallback, useEffect } from 'react';

export const navigateGenericCarousel = (
  reference: HTMLUListElement | undefined,
  chunkSize: number,
  dataLength: number
): ((delta: number) => void) => {
  const carouselIndexRef = useRef<number>(0);

  const navigate = useCallback((): void => {
    if (reference instanceof HTMLUListElement) {
      const listItems: HTMLCollection = reference.children;
      const targetIndex: number = carouselIndexRef.current * chunkSize;

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
  }, [chunkSize, reference]);

  const updateCarouselIndex = useCallback(
    (delta: number): void => {
      const maxIndex = Math.ceil(dataLength / chunkSize) - 1;
      carouselIndexRef.current = Math.max(0, Math.min(carouselIndexRef.current + delta, maxIndex));
      navigate();
    },
    [dataLength, chunkSize, navigate]
  );

  useEffect(() => updateCarouselIndex(0), [chunkSize]);

  return updateCarouselIndex;
};
