import { useEffect, useRef } from 'react';
import { IcBaselineArrowLeft, IcBaselineArrowRight } from '~/film-database/assets/svg/icons';
import type { TmdbResponseFlat } from '~/film-database/composables/types/TmdbResponse';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import { useCarouselNavigation } from '~/film-database/hooks/useCarouselNavigation';

const PersonMovieCarousel = ({
  heading,
  data,
}: {
  heading: string;
  data: TmdbResponseFlat['personCredits']['cast'] | TmdbResponseFlat['personCredits']['crew'];
}) => {
  const { modalChunkSize, setIsModal, setHeroData } = useCatalogProvider();
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

  return (
    <section
      className='fdCineInfoCarousel'
      data-anim='active'>
      <header className='fdCineInfoCarousel__header'>
        <h2 className='fdCineInfoCarousel__header--h2'>{heading}</h2>
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
                <button
                  aria-label={`Read more about ${article.title}`}
                  onPointerUp={() => {
                    setIsModal('movie');
                    setHeroData(article);
                  }}>
                  <picture
                    className='fdCineInfoCarousel__wrapper__ul__li__picture'
                    data-missing={article.poster_path ? 'false' : 'true'}>
                    {article.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w780/${article.poster_path}`}
                        alt={`${article.title}`}
                        fetchPriority={index <= modalChunkSize ? 'high' : 'low'}
                      />
                    ) : (
                      <img
                        src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`}
                        alt={`${article.title}`}
                        fetchPriority='low'
                      />
                    )}
                  </picture>
                </button>
              </li>
            );
          })}
        </ul>
        <nav className='fdCineInfoCarousel__wrapper__navigation'>
          <button
            className='fdCineInfoCarousel__wrapper__navigation__button'
            aria-label={'Show Previous'}
            onPointerUp={() => updateCarouselIndex(-1)}>
            <IcBaselineArrowLeft />
          </button>
          <button
            className='fdCineInfoCarousel__wrapper__navigation__button'
            aria-label={'Show More'}
            onPointerUp={() => updateCarouselIndex(1)}>
            <IcBaselineArrowRight />
          </button>
        </nav>
      </div>
    </section>
  );
};

export default PersonMovieCarousel;
