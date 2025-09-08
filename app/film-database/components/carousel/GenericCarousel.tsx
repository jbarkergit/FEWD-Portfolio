import { useEffect, useRef } from 'react';
import GenericCarouselNavigation from '~/film-database/components/carousel/GenericCarouselNavigation';
import type { TmdbMovieProvider, TmdbResponseFlat } from '~/film-database/composables/types/TmdbResponse';
import GenericCarouselPoster from '~/film-database/components/carousel/GenericCarouselPoster';
import { SvgSpinnersRingResize } from '~/film-database/assets/svg/icons';
import { useChunkSize } from '~/film-database/context/ChunkSizeContext';

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
  const { chunkSize } = useChunkSize();
  const carouselRef = useRef<HTMLUListElement>(null);
  const isModal: boolean =
    carouselName === 'media'
      ? false
      : carouselName === 'cinemaInformation'
        ? true
        : carouselName === 'person'
          ? true
          : false;

  /**
   * @function observer Virtual Scroll
   * Handles visibility of list items as the user scrolls
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.getAttribute('data-hidden') === 'true') {
            entry.target.setAttribute('data-hidden', 'false');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0 }
    );

    if (carouselRef.current) {
      for (const node of carouselRef.current.children) {
        observer.observe(node);
      }
    }

    return () => observer.disconnect();
  }, [data]);

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
          ref={carouselRef}
          data-modal={carouselName}>
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
            : Array.from({ length: isModal ? chunkSize.modal : chunkSize.viewport }).map((_, i) => (
                <li
                  className='genericCarousel__wrapper__ul__loading'
                  key={`generic-carousel-${carouselName}-ul-loader-${i}`}>
                  <SvgSpinnersRingResize />
                </li>
              ))}
        </ul>
        <GenericCarouselNavigation
          dataLength={data.length}
          chunkSizePref={isModal ? 'modal' : 'viewport'}
          reference={carouselRef.current}
        />
      </div>
    </section>
  );
}

export default GenericCarousel;
