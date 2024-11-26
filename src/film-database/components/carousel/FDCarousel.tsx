// Deps
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// Composables
import { Namespace_Tmdb } from '../../composables/tmdb-api/hooks/useTmdbFetcher';
// Context
import { useCatalogProvider } from '../../context/CatalogContext';
// Hooks
import { Type_usePaginateData_Provider } from '../../hooks/usePaginateData';
// Assets
import { MaterialSymbolsPlayArrow } from '../../assets/google-material-symbols/iFrameSymbols';
import { MaterialSymbolsChevronLeft, MaterialSymbolsChevronRight } from '../../assets/google-material-symbols/carouselSymbols';

const FDCarousel = ({
  type,
  mapIndex,
  heading,
  data,
}: {
  type: 'movies' | 'cast' | 'crew';
  mapIndex: number;
  heading: string;
  data: Array<Type_usePaginateData_Provider>;
}) => {
  if (!data) return;
  // Context
  const { itemsPerPage, setHeroData } = useCatalogProvider();
  // References
  const carouselRef = useRef<HTMLUListElement>(null);
  // State
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [articles, setArticles] = useState<typeof data>([data[0]]);

  /** Track carousel navigation index */
  const updateCarouselIndex = (delta: number): void => setCarouselIndex(Math.max(0, Math.min(carouselIndex + delta, data.length - 1)));

  /** Render paginated sets on navigation */
  const renderPaginatedDataSet = (): void => {
    const isIndexInArticles: boolean = articles.some((_, index) => index === carouselIndex);

    if (!isIndexInArticles) {
      setArticles((prevState) => {
        switch (type) {
          case 'movies':
            const prevMovies = prevState as Namespace_Tmdb.BaseMedia_Provider[][];
            const newMovies = data[carouselIndex] as Namespace_Tmdb.BaseMedia_Provider[];
            return [...prevMovies, newMovies];

          case 'cast':
            const prevCast = prevState as Namespace_Tmdb.Credits_Obj['credits']['cast'][];
            const newCast = data[carouselIndex] as Namespace_Tmdb.Credits_Obj['credits']['cast'];
            return [...prevCast, newCast];

          case 'crew':
            const prevCrew = prevState as Namespace_Tmdb.Credits_Obj['credits']['crew'][];
            const newCrew = data[carouselIndex] as Namespace_Tmdb.Credits_Obj['credits']['crew'];
            return [...prevCrew, newCrew];

          default:
            return prevState;
        }
      });
    } else {
      navigate();
    }
  };

  useEffect(() => renderPaginatedDataSet(), [carouselIndex]);

  /** Pagination on pointer drag */
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[entries.length - 1].isIntersecting) setCarouselIndex(Math.max(0, Math.min(carouselIndex + 1, data.length - 1)));
    },
    { threshold: 1.0 }
  );

  useEffect(() => {
    const lastCarouselNode = carouselRef.current?.children[carouselRef.current.children.length - 1];
    if (!lastCarouselNode) return;

    const observe = (): void => {
      if (window.innerWidth <= 1000) {
        observer.observe(lastCarouselNode);
      } else {
        observer.unobserve(lastCarouselNode);
      }
    };

    observe();
    window.addEventListener('resize', observe);

    return () => {
      window.removeEventListener('resize', observe);
      observer.unobserve(lastCarouselNode);
      observer.disconnect();
    };
  }, [carouselRef.current]);

  /** Horizontal Navigation */
  const navigate = (): void => {
    if (!itemsPerPage || !carouselRef.current || !carouselRef.current.children) return;
    // Target indexes and elements
    const targetIndex: number = carouselIndex * itemsPerPage;
    const targetElement = carouselRef.current.children[targetIndex] as HTMLLIElement;
    // Positions
    const carouselPosition: number = carouselRef.current.offsetLeft;
    const scrollPosition: number = targetElement.offsetLeft - carouselPosition;
    // Scroll
    carouselRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  };

  useEffect(() => navigate(), [articles]);

  /** JSX */
  return (
    <section className='fdCarousel' data-anim='active'>
      <div className='fdCarousel__header'>
        <h2 className='fdCarousel__header--h2'>{heading.replaceAll('_', ' ')}</h2>
      </div>
      <div className='fdCarousel__wrapper'>
        <ul className='fdCarousel__wrapper__ul' ref={carouselRef}>
          {articles.length > 0
            ? articles.flat().map((article) => {
                let props: { src: string | null; alt: string } = { src: '', alt: '' };

                if (type === 'movies') {
                  const prop = article as Namespace_Tmdb.BaseMedia_Provider;
                  props = { src: prop.poster_path, alt: prop.title };
                } else if (type === 'cast' || type === 'crew') {
                  const prop = article as Namespace_Tmdb.Credits_Obj['credits']['cast'][0];
                  props = { src: prop.profile_path, alt: prop.name };
                }

                return (
                  <li className='fdCarousel__wrapper__ul__li' key={uuidv4()}>
                    <picture className='fdCarousel__wrapper__ul__li__picture'>
                      <img
                        className='fdCarousel__wrapper__ul__li__picture--img'
                        src={`${type === 'movies' ? `https://image.tmdb.org/t/p/w780/${props.src}` : props.src ? `https://image.tmdb.org/t/p/w780/${props.src}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`}`}
                        alt={`${props.alt}`}
                        fetchPriority={mapIndex === 0 ? 'high' : 'low'}
                      />
                    </picture>
                    {type === 'movies' && (
                      <div className='fdCarousel__wrapper__ul__li__overlay'>
                        <button
                          className='fdCarousel__wrapper__ul__li__overlay--play'
                          aria-label='Play trailer'
                          onClick={() => {
                            setHeroData(article as Namespace_Tmdb.BaseMedia_Provider);
                          }}>
                          <MaterialSymbolsPlayArrow />
                        </button>
                      </div>
                    )}
                  </li>
                );
              })
            : null}
        </ul>
        <nav className='fdCarousel__wrapper__navigation'>
          <button className='fdCarousel__wrapper__navigation__button' aria-label={'Show Previous'} onClick={() => updateCarouselIndex(-1)}>
            <MaterialSymbolsChevronLeft />
          </button>
          <button className='fdCarousel__wrapper__navigation__button' aria-label={'Show More'} onClick={() => updateCarouselIndex(1)}>
            <MaterialSymbolsChevronRight />
          </button>
        </nav>
      </div>
    </section>
  );
};

export default FDCarousel;
