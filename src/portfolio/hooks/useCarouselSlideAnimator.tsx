import { MutableRefObject } from 'react';

type StyleDistancesType = {
  scale: number;
  filter: string;
};

export const useCarouselSlideAnimator = (
  container: MutableRefObject<HTMLDivElement | null>,
  arrayOfSlides: MutableRefObject<HTMLElement[]>,
  horizontalCarousel: boolean
): StyleDistancesType[] => {
  // Accumulator array to return
  const styleDistancesArray: StyleDistancesType[] = [];

  // Logic
  if (container.current && arrayOfSlides.current) {
    const carouselSliderWidth: number = container.current.clientWidth as number;
    const carouselSliderHeight: number = container.current.clientHeight as number;

    arrayOfSlides.current.forEach((slide: HTMLElement) => {
      // Resize Slides
      const slideBound: DOMRect = slide.getBoundingClientRect();
      const slideCenterX: number = slideBound.right - slideBound.width / 2;
      const slideCenterY: number = slideBound.top - slideBound.height / 2;

      const exponentData: Record<string, number> = {
        carouselPaddingX: parseInt(window.getComputedStyle(container.current as HTMLElement).paddingLeft),
        carouselPaddingY: parseInt(window.getComputedStyle(container.current as HTMLElement).paddingTop),
        slideDistanceFromViewportCenterX: Math.abs(slideCenterX - carouselSliderWidth / 2),
        slideDistanceFromViewportCenterY: Math.abs(slideCenterY - carouselSliderHeight / 2),
      };

      const exponents: Record<string, number> = {
        carouselPadding: horizontalCarousel ? exponentData.carouselPaddingX : exponentData.carouselPaddingY,
        slideDistanceFromViewport: horizontalCarousel ? exponentData.slideDistanceFromViewportCenterX : exponentData.slideDistanceFromViewportCenterY,
        containerDimensions: horizontalCarousel ? carouselSliderWidth : carouselSliderHeight,
      };

      const scale: Record<string, number> = {
        filterMinimum: 0.8,
        filterMaximum: 1,
        maximumDistance: exponents.containerDimensions / 2 + exponents.carouselPadding,
        scaleExponent: 8,
      };

      // New Values
      const scaleFilterClamp: number = Math.min(
        scale.filterMaximum,
        Math.max(scale.filterMinimum, scale.filterMaximum - Math.pow(exponents.slideDistanceFromViewport / scale.maximumDistance, scale.scaleExponent))
      );

      // Calculate filter intensity: distance between slide and viewport center
      const filterIntensity: number = (scaleFilterClamp - scale.filterMinimum) / (scale.filterMaximum - scale.filterMinimum);

      const saturationFilter: Record<string, number> = {
        grayscale: 85 - filterIntensity * 85,
        sepia: 80 - filterIntensity * 80,
        brightness: 50 - filterIntensity * 50 * -1,
      };

      // Calculate scale && filter
      const styleDistances: StyleDistancesType = {
        scale: scaleFilterClamp,
        filter: `grayscale(${Math.abs(saturationFilter.grayscale - 1)}%) sepia(${Math.abs(saturationFilter.sepia - 1)}%) brightness(${Math.abs(
          saturationFilter.brightness - 1
        )}%)`,
      };

      // Storage
      styleDistancesArray.push(styleDistances);
    });
  }

  return styleDistancesArray;
};
