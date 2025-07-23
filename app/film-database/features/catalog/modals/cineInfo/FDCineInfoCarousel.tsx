import { useRef, useEffect } from 'react';
import { IcBaselineArrowLeft, IcBaselineArrowRight } from '~/film-database/assets/svg/icons';
import type { TmdbState } from '~/film-database/composables/tmdbCall';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import { useCarouselNavigation } from '~/film-database/hooks/useCarouselNavigation';

type Cast = TmdbState<'credits'>['response']['cast'][number];
type Crew = TmdbState<'credits'>['response']['crew'][number];

type CastChunks = Cast[][];
type CrewChunks = Crew[][];

type DataProp = CastChunks | CrewChunks;

const FDCineInfoCarousel = ({ mapIndex, heading, data }: { mapIndex: number; heading: string; data: DataProp }) => {
  // Context
  const { modalChunkSize } = useCatalogProvider();
  // References
  const carouselRef = useRef<HTMLUListElement>(null);

  /**
   * @function useCarouselNavigation
   * @description Hook that handles navigation for all carousels across the application
   */
  const updateCarouselIndex = useCarouselNavigation({
    dataLength: data.length,
    chunkSize: modalChunkSize,
    reference: carouselRef,
  });

  /** Virtual scroll */
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

  useEffect(() => {
    // Observe each carousel section
    if (carouselRef.current) {
      const children = carouselRef.current.children;

      for (let i = 0; i < children.length; i++) {
        observer.observe(children[i]!);
      }
    }
    return () => observer.disconnect();
  }, [carouselRef.current]);

  /** JSX */
  return (
    data.length > 0 && (
      <section
        className='fdCineInfoCarousel'
        data-anim='active'>
        <header className='fdCineInfoCarousel__header'>
          <h2 className='fdCineInfoCarousel__header--h2'>{heading.replaceAll('_', ' ')}</h2>
        </header>
        <div className='fdCineInfoCarousel__wrapper'>
          <ul
            className='fdCineInfoCarousel__wrapper__ul'
            ref={carouselRef}>
            {data.flat().map((article, index) => {
              return (
                <li
                  className='fdCineInfoCarousel__wrapper__ul__li'
                  data-hidden={index < modalChunkSize + 1 ? 'false' : 'true'}
                  key={`cineInfo-carousel-${article.id}-${index}`}>
                  <picture
                    className='fdCineInfoCarousel__wrapper__ul__li__picture'
                    data-missing={article.profile_path ? 'false' : 'true'}>
                    {article.profile_path ? (
                      <img
                        className='fdCineInfoCarousel__wrapper__ul__li__picture--img'
                        src={`https://image.tmdb.org/t/p/w780/${article.profile_path}`}
                        alt={`${article.name}`}
                        fetchPriority={mapIndex <= modalChunkSize ? 'high' : 'low'}
                      />
                    ) : (
                      <img
                        className='fdCineInfoCarousel__wrapper__ul__li__picture--img'
                        src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`}
                        alt={`${article.name}`}
                        fetchPriority='low'
                      />
                    )}
                  </picture>
                  <div className='fdCineInfoCarousel__wrapper__ul__li__member'>
                    <span>{article.name}</span>
                    <span>{article.character}</span>
                    <span>{article.known_for_department !== 'Acting' ? article.known_for_department : null}</span>
                  </div>
                </li>
              );
            })}
          </ul>
          <nav className='fdCineInfoCarousel__wrapper__navigation'>
            <button
              className='fdCineInfoCarousel__wrapper__navigation__button'
              aria-label={'Show Previous'}
              onClick={() => updateCarouselIndex(-1)}>
              <IcBaselineArrowLeft />
            </button>
            <button
              className='fdCineInfoCarousel__wrapper__navigation__button'
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

export default FDCineInfoCarousel;
