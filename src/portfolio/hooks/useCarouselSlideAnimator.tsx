import { MutableRefObject } from 'react';

export const useCarouselSlideAnimator = (
  container: MutableRefObject<HTMLDivElement | null>,
  arrayOfSlides: MutableRefObject<HTMLElement[]>,
  widthNotHeight: boolean
): void => {
  if (container.current && arrayOfSlides.current) {
    const carouselSliderWidth: number = container.current.scrollWidth as number;
    const carouselSliderHeight: number = container.current.scrollHeight as number;

    arrayOfSlides.current.forEach((slide: HTMLElement) => {
      // Resize Slides
      const slideBound: DOMRect = slide.getBoundingClientRect();
      const slideCenterX: number = slideBound.left + slideBound.width / 2;
      const slideCenterY: number = slideBound.top + slideBound.height / 2;

      const exponentData: Record<string, number> = {
        carouselPaddingX: parseInt(window.getComputedStyle(container.current as HTMLElement).paddingLeft),
        carouselPaddingY: parseInt(window.getComputedStyle(container.current as HTMLElement).paddingTop),
        slideDistanceFromViewportCenterX: Math.abs(slideCenterX - carouselSliderWidth / 2),
        slideDistanceFromViewportCenterY: Math.abs(slideCenterY - carouselSliderHeight / 2),
      };

      const exponents: Record<string, number> = {
        carouselPadding: widthNotHeight ? exponentData.carouselPaddingX : exponentData.carouselPaddingY,
        slideMaximumDistance: widthNotHeight ? exponentData.slideDistanceFromViewportCenterX : exponentData.slideDistanceFromViewportCenterY,
        scaleMaximumDistance: widthNotHeight ? carouselSliderWidth : carouselSliderHeight,
      };

      const scale: Record<string, number> = {
        minimumScale: 0.85,
        maximumScale: 1,
        maximumDistance: exponents.scaleMaximumDistance / 2 + exponents.carouselPadding,
        scaleExponent: 1.5,
      };

      // New Values
      const newScaleValue: number = Math.min(
        1,
        Math.max(scale.minimumScale, scale.maximumScale - Math.pow(exponents.slideMaximumDistance / scale.maximumDistance, scale.scaleExponent))
      );

      const filterIntensity: number = (newScaleValue - scale.minimumScale) / (scale.maximumScale - scale.minimumScale);

      const saturationFilter: Record<string, number> = {
        grayscale: 85 - filterIntensity * 85,
        sepia: 80 - filterIntensity * 80,
        brightness: 65 - filterIntensity * 65,
        opacity: 80 - filterIntensity * 80,
      };

      // Scale && Filter
      slide.style.transform = `scale(${newScaleValue})`;
      slide.style.filter = `grayscale(${saturationFilter.grayscale}%) sepia(${saturationFilter.sepia}%) brightness(${saturationFilter.brightness}%) opacity(${saturationFilter.opacity}%)`;
    });
  } else {
    return;
  }
};
