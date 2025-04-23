import { useRef, useEffect, useId } from 'react';
import { IcBaselineArrowLeft, IcBaselineArrowRight } from '~/film-database/assets/svg/icons';
import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import type { Type_usePaginateData_Data_Provider } from '~/film-database/hooks/usePaginateData';

const FDCineInfoCarousel = ({ mapIndex, heading, data }: { mapIndex: number; heading: string; data: Type_usePaginateData_Data_Provider[] }) => {
  // Context
  const { modalChunkSize } = useCatalogProvider();
  // References
  const carouselRef = useRef<HTMLUListElement>(null);

  /** Desktop Horizontal Navigation */
  let carouselIndex: number = 0;

  const updateCarouselIndex = (delta: number): void => {
    carouselIndex = Math.max(0, Math.min(carouselIndex + delta, data.flat().length));
    navigate();
  };

  useEffect(() => updateCarouselIndex(0), [modalChunkSize]);

  const navigate = (): void => {
    if (carouselRef.current) {
      const listItems: HTMLCollection = carouselRef.current.children;

      // Target index
      const targetIndex: number = carouselIndex * modalChunkSize;

      // Target element
      let targetElement: HTMLLIElement | null = null;
      const target = listItems[targetIndex] as HTMLLIElement;
      target ? (targetElement = target) : (targetElement = listItems[listItems.length] as HTMLLIElement);

      // Positions
      const carouselPosition: number = carouselRef.current.offsetLeft;
      const scrollPosition: number = targetElement.offsetLeft - carouselPosition;

      // Carousel margins
      const carouselMargin: number = parseInt((listItems[0] as HTMLLIElement).style.marginLeft);

      // Scroll position accounting carousel's margins
      const newScrollPosition =
        targetIndex === 0 ? scrollPosition - carouselMargin : targetIndex === listItems.length ? scrollPosition + carouselMargin : scrollPosition;

      // Scroll
      carouselRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
    }
  };

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
    if (carouselRef.current) for (let i = 0; i < carouselRef.current.children.length; i++) observer.observe(carouselRef.current.children[i]);
    return () => observer.disconnect();
  }, [carouselRef.current]);

  /** JSX */
  return (
    data.length > 0 && (
      <section className='fdCineInfoCarousel' data-anim='active'>
        <header className='fdCineInfoCarousel__header'>
          <h2 className='fdCineInfoCarousel__header--h2'>{heading.replaceAll('_', ' ')}</h2>
        </header>
        <div className='fdCineInfoCarousel__wrapper'>
          <ul className='fdCineInfoCarousel__wrapper__ul' ref={carouselRef}>
            {data.flat().map((article, index) => {
              const prop = article as Namespace_Tmdb.Credits_Obj['credits']['cast'][0];
              return (
                <li className='fdCineInfoCarousel__wrapper__ul__li' data-hidden={index < modalChunkSize + 1 ? 'false' : 'true'} key={useId()}>
                  <picture className='fdCineInfoCarousel__wrapper__ul__li__picture' data-missing={prop.profile_path ? 'false' : 'true'}>
                    {prop.profile_path ? (
                      <img
                        className='fdCineInfoCarousel__wrapper__ul__li__picture--img'
                        src={`https://image.tmdb.org/t/p/w780/${prop.profile_path}`}
                        alt={`${prop.name}`}
                        fetchPriority={mapIndex <= modalChunkSize ? 'high' : 'low'}
                      />
                    ) : (
                      <img
                        className='fdCineInfoCarousel__wrapper__ul__li__picture--img'
                        src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`}
                        alt={`${prop.name}`}
                        fetchPriority='low'
                      />
                    )}
                  </picture>
                  <div className='fdCineInfoCarousel__wrapper__ul__li__member'>
                    <span>{prop.name}</span>
                    <span>{prop.character}</span>
                    <span>{prop.known_for_department !== 'Acting' ? prop.known_for_department : null}</span>
                  </div>
                </li>
              );
            })}
          </ul>
          <nav className='fdCineInfoCarousel__wrapper__navigation'>
            <button className='fdCineInfoCarousel__wrapper__navigation__button' aria-label={'Show Previous'} onClick={() => updateCarouselIndex(-1)}>
              <IcBaselineArrowLeft />
            </button>
            <button className='fdCineInfoCarousel__wrapper__navigation__button' aria-label={'Show More'} onClick={() => updateCarouselIndex(1)}>
              <IcBaselineArrowRight />
            </button>
          </nav>
        </div>
      </section>
    )
  );
};

export default FDCineInfoCarousel;
