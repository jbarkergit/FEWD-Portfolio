import { useRef, useEffect } from 'react';
import { IcBaselineArrowLeft, IcBaselineArrowRight } from '~/film-database/assets/svg/icons';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import FDCarouselPoster from './FDCarouselPoster';
import { useCarouselNavigation } from '~/film-database/hooks/useCarouselNavigation';
import type { TmdbMovieProvider } from '~/film-database/composables/types/TmdbResponse';

type Props = {
  mapIndex: number;
  heading: string;
  data: TmdbMovieProvider[][];
};

const FDCarousel = ({ mapIndex, heading, data }: Props) => {
  const { viewportChunkSize } = useCatalogProvider();
  const carouselRef = useRef<HTMLUListElement>(null);

  /**
   * @function useCarouselNavigation
   * @description Hook that handles navigation for all carousels across the application
   */
  const updateCarouselIndex = useCarouselNavigation({
    dataLength: data.length,
    chunkSize: viewportChunkSize,
    reference: carouselRef,
  });

  /**
   * @function observer Virtual Scroll
   * Handles visibility of list items as the user scrolls
   */
  const observer = new IntersectionObserver(
    (entries) => {
      // For each poster in carousel section
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (entry.target.getAttribute('data-hidden') === 'true') entry.target.setAttribute('data-hidden', 'false');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0 }
  );

  // Observe each carousel section
  useEffect(() => {
    if (carouselRef.current) {
      for (let i = 0; i < carouselRef.current.children.length; i++) {
        const node = carouselRef.current.children[i];
        if (node) observer.observe(node);
      }
    }
    return () => observer.disconnect();
  }, [carouselRef.current]);

  /** @returns */
  return (
    data.length > 0 && (
      <section
        className='fdCarousel'
        data-anim='active'>
        <div className='fdCarousel__header'>
          <h2 className='fdCarousel__header--h2'>{heading.replaceAll('_', ' ')}</h2>
        </div>
        <div className='fdCarousel__wrapper'>
          <ul
            className='fdCarousel__wrapper__ul'
            ref={carouselRef}>
            {data.flat().map((article, index) => (
              <FDCarouselPoster
                mapIndex={mapIndex}
                index={index}
                article={article}
                key={`carousel-${mapIndex}-li-${index}`}
              />
            ))}
          </ul>
          <nav className='fdCarousel__wrapper__navigation'>
            <button
              className='fdCarousel__wrapper__navigation__button'
              aria-label={'Show Previous'}
              onClick={() => updateCarouselIndex(-1)}>
              <IcBaselineArrowLeft />
            </button>
            <button
              className='fdCarousel__wrapper__navigation__button'
              aria-label={'Show More'}
              onClick={() => updateCarouselIndex(1)}>
              <IcBaselineArrowRight />
            </button>
          </nav>
        </div>
      </section>
    )
  );
};

export default FDCarousel;
