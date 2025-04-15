import { useRef, useEffect } from 'react';
import { BxDotsVerticalRounded, IcBaselineArrowLeft, IcBaselineArrowRight, IcOutlinePlayCircle } from '~/film-database/assets/svg/icons';
import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import type { Type_usePaginateData_Data_Provider } from '~/film-database/hooks/usePaginateData';

const FDCarousel = ({ mapIndex, heading, data }: { mapIndex: number; heading: string; data: Type_usePaginateData_Data_Provider[] }) => {
  const { userCollections, setHeroData, maxCarouselNodes } = useCatalogProvider();
  const carouselRef = useRef<HTMLUListElement>(null);
  let carouselIndex: number = 0;

  /**
   * @function navigate
   * @returns {void}
   * Carousel scroll functionality
   */
  const navigate = (): void => {
    if (carouselRef.current) {
      const listItems: HTMLCollection = carouselRef.current.children;

      // Target index
      const targetIndex: number = carouselIndex * maxCarouselNodes;

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

  /**
   * @function updateCarouselIndex
   * @returns {void}
   * Updates the carousel index, invokes `navigate()`
   */
  const updateCarouselIndex = (delta: number): void => {
    carouselIndex = Math.max(0, Math.min(carouselIndex + delta, data.flat().length));
    navigate();
  };

  useEffect(() => updateCarouselIndex(0), [maxCarouselNodes]);

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

  useEffect(() => {
    // Observe each carousel section
    if (carouselRef.current) for (let i = 0; i < carouselRef.current.children.length; i++) observer.observe(carouselRef.current.children[i]);
    return () => observer.disconnect();
  }, [carouselRef.current]);

  /**
   * @function toggleCollectionMenu
   * @returns {void}
   * Toggles the collection menu on independent movie list items
   */
  const collectionsMenu = useRef<HTMLUListElement>(null);

  const toggleCollectionMenu = (): void => {
    if (collectionsMenu.current) {
      const attribute: string = 'data-visible';
      const status: string | null = collectionsMenu.current.getAttribute(attribute);
      collectionsMenu.current.setAttribute(attribute, status && status === 'false' ? 'true' : 'false');
    }
  };

  /**
   * @function
   * @returns
   */
  return (
    data.length > 0 && (
      <section className='fdCarousel' data-anim='active'>
        <div className='fdCarousel__header'>
          <h2 className='fdCarousel__header--h2'>{heading.replaceAll('_', ' ')}</h2>
        </div>
        <div className='fdCarousel__wrapper'>
          <ul className='fdCarousel__wrapper__ul' ref={carouselRef}>
            {data.flat().map((article, index) => {
              let props: { src: string | null; alt: string; member?: string | undefined; knownFor?: string | undefined } = { src: '', alt: '' };
              const prop = article as Namespace_Tmdb.BaseMedia_Provider;
              props = { src: prop.poster_path, alt: prop.title };

              return (
                <li className='fdCarousel__wrapper__ul__li' data-hidden={index < maxCarouselNodes + 1 ? 'false' : 'true'} key={`carousel-${mapIndex}-li-${index}`}>
                  <picture className='fdCarousel__wrapper__ul__li__picture'>
                    <img
                      className='fdCarousel__wrapper__ul__li__picture--img'
                      src={`https://image.tmdb.org/t/p/w780/${props.src}`}
                      alt={`${props.alt}`}
                      fetchPriority={mapIndex === 0 ? 'high' : 'low'}
                    />
                  </picture>
                  <div className='fdCarousel__wrapper__ul__li__overlay'>
                    <button className='fdCarousel__wrapper__ul__li__overlay--collections' aria-label='Add movie to collections' onPointerUp={toggleCollectionMenu}>
                      <BxDotsVerticalRounded />
                    </button>
                    <button
                      className='fdCarousel__wrapper__ul__li__overlay--play'
                      aria-label='Play trailer'
                      onClick={() => setHeroData(article as Namespace_Tmdb.BaseMedia_Provider)}>
                      <IcOutlinePlayCircle />
                    </button>
                  </div>
                  <ul className='fdCarousel__wrapper__ul__li__collections' ref={collectionsMenu} data-visible='false'>
                    {Object.entries(userCollections).map((entry, index) => (
                      <li key={`movie-dropdown-collections-${index}`}>
                        <button aria-label={`Add movie to ${entry[1].header}`}>{entry[1].header}</button>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
          <nav className='fdCarousel__wrapper__navigation'>
            <button className='fdCarousel__wrapper__navigation__button' aria-label={'Show Previous'} onClick={() => updateCarouselIndex(-1)}>
              <IcBaselineArrowLeft />
            </button>
            <button className='fdCarousel__wrapper__navigation__button' aria-label={'Show More'} onClick={() => updateCarouselIndex(1)}>
              <IcBaselineArrowRight />
            </button>
          </nav>
        </div>
      </section>
    )
  );
};

export default FDCarousel;
