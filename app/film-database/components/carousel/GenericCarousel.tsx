import { useEffect, useRef, useState } from 'react';
import GenericCarouselNavigation from '~/film-database/components/carousel/GenericCarouselNavigation';
import type { TmdbMovieProvider, TmdbResponseFlat } from '~/film-database/composables/types/TmdbResponse';
import GenericCarouselPoster from '~/film-database/components/carousel/GenericCarouselPoster';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import { SvgSpinnersRingResize } from '~/film-database/assets/svg/icons';

export type GenericCarouselMap = {
  media: TmdbMovieProvider[];
  cinemaInformation: TmdbResponseFlat['credits']['cast'] | TmdbResponseFlat['credits']['crew'];
  person: TmdbResponseFlat['personCredits']['cast'] | TmdbResponseFlat['personCredits']['crew'];
};

function GenericCarousel<CN extends keyof GenericCarouselMap>({
  carouselIndex,
  carouselName,
  heading,
  data,
}: {
  carouselIndex: number;
  carouselName: CN;
  heading: string;
  data: GenericCarouselMap[CN];
}) {
  const { modalChunkSize, viewportChunkSize } = useCatalogProvider();
  const carouselRef = useRef<HTMLUListElement>(null);
  const isModal: boolean = carouselName === 'media' ? false : carouselName === 'cinemaInformation' ? true : false;

  /**
   * @function observer Virtual Scroll
   * Handles visibility of list items as the user scrolls
   */
  const observer = new IntersectionObserver(
    (carousel) => {
      for (const poster of carousel) {
        if (poster.isIntersecting) {
          if (poster.target.getAttribute('data-hidden') === 'true') {
            poster.target.setAttribute('data-hidden', 'false');
          }
          observer.unobserve(poster.target);
        }
      }
    },
    { threshold: 0 }
  );

  useEffect(() => {
    if (carouselRef.current) {
      for (let i = 0; i < carouselRef.current.children.length; i++) {
        const node = carouselRef.current.children[i];
        if (node) observer.observe(node);
      }
    }
    return () => observer.disconnect();
  }, [carouselRef.current]);

  return (
    <section
      className='genericCarousel'
      data-anim='active'>
      <header className='genericCarousel__header'>
        <h2 className='genericCarousel__header--h2'>{heading.replaceAll('_', ' ')}</h2>
      </header>
      <div className='genericCarousel__wrapper'>
        <ul
          className='genericCarousel__wrapper__ul'
          ref={carouselRef}>
          {data.length
            ? data.flat().map((entry, posterIndex) => (
                <GenericCarouselPoster
                  carouselName={carouselName}
                  carouselIndex={carouselIndex}
                  posterIndex={posterIndex}
                  entry={entry}
                  key={`${carouselName}-carousel-${carouselIndex}-li-${posterIndex}`}
                />
              ))
            : Array.from({ length: isModal ? modalChunkSize : viewportChunkSize }).map((_, i) => (
                <li
                  className='genericCarousel__wrapper__ul__loading'
                  key={`generic-carousel-${carouselName}-ul-loader-${i}`}>
                  <SvgSpinnersRingResize />
                </li>
              ))}
        </ul>
        <GenericCarouselNavigation
          dataLength={data.length}
          chunkSize={isModal ? 'modal' : 'viewport'}
          reference={carouselRef}
        />
      </div>
    </section>
  );
}

export default GenericCarousel;
