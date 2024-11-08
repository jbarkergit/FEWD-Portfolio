// Deps
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// Composables
import { Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';
// Context
import { useCatalogProvider } from '../context/CatalogContext';
// Hooks
import { usePostersPerPage } from '../hooks/usePostersPerPage';
// Assets
import { MaterialSymbolsChevronLeft, MaterialSymbolsChevronRight } from '../assets/google-material-symbols/carouselSymbols';
import { MaterialSymbolsPlayArrow } from '../assets/google-material-symbols/iFrameSymbols';

type Variant = {
  variant: {
    type: 'movies' | 'people';
    mapIndex: number;
    heading: string;
    data: Namespace_Tmdb.BaseMedia_Provider[][];
  };
};

const FDCarousels = ({ variant }: Variant) => {
  const { type, mapIndex, heading, data } = variant;
  const { setHeroData } = useCatalogProvider();
  const carouselRef = useRef<HTMLUListElement>(null);

  /** State */
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [articles, setArticles] = useState<Namespace_Tmdb.BaseMedia_Provider[][]>([data[0]]);

  /** Track carousel navigation index */
  const updateCarouselIndex = (delta: number): void => setCarouselIndex(Math.max(0, Math.min(carouselIndex + delta, data.length - 1)));

  /** Render paginated sets on navigation */
  const renderPaginatedDataSet = (): void => {
    const isIndexInArticles: boolean = articles.some((_, index) => index === carouselIndex);

    if (!isIndexInArticles) {
      setArticles((prevState) => {
        return [...prevState, data[carouselIndex]];
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
  const postersPerPage: number | undefined = usePostersPerPage();

  const navigate = (): void => {
    if (!postersPerPage || !carouselRef.current || !carouselRef.current.children) return;
    // Target indexes and elements
    const targetIndex: number = carouselIndex * postersPerPage;
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
          {articles.flat().map((article) => {
            return (
              <li className='fdCarousel__wrapper__ul__li' key={uuidv4()} onClick={() => setHeroData(article)}>
                <picture className='fdCarousel__wrapper__ul__li__picture'>
                  <img className='fdCarousel__wrapper__ul__li__picture--img' src={`https://image.tmdb.org/t/p/w780/${article?.poster_path}`} alt={`${article?.title}`} fetchPriority={mapIndex === 0 ? 'high' : 'low'} />
                </picture>
                <div className='fdCarousel__wrapper__ul__li__overlay'>
                  <button className='fdCarousel__wrapper__ul__li__overlay--play' aria-label='Play trailer'>
                    <MaterialSymbolsPlayArrow />
                  </button>
                </div>
              </li>
            );
          })}
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

export default FDCarousels;
0;
