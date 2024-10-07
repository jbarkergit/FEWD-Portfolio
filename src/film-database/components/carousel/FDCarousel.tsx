import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';
import FDCarouselArticles from '../../components/carousel/FDCarouselArticles';
import { MaterialSymbolsChevronLeft, MaterialSymbolsChevronRight } from '../../assets/google-material-symbols/carouselSymbols';

type Type_FilmDatabase_Props = {
  mapIndex: number;
  dataKey: string;
  mapValue: Type_Tmdb_Api_Union[][];
  maxVisibleCarouselNodes: number;
  setHeroData: Dispatch<SetStateAction<Type_Tmdb_Api_Union | null>>;
};

const FDCarousel = ({ mapIndex, dataKey, mapValue, maxVisibleCarouselNodes, setHeroData }: Type_FilmDatabase_Props) => {
  /** Track carousel navigation index */
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  const updateCarouselIndex = (delta: number): void => {
    setCarouselIndex(Math.max(0, Math.min(carouselIndex + delta, mapValue.length - 1)));
  };

  /** Render paginated sets on navigation */
  const [articles, setArticles] = useState<Type_Tmdb_Api_Union[][]>([mapValue[0]]);
  const articlesFlatMap: Type_Tmdb_Api_Union[] = articles.flatMap((innerArray) => innerArray);

  const renderPaginatedDataSet = (): void => {
    const isIndexInArticles: boolean = articles.some((_, index) => index === carouselIndex);

    if (!isIndexInArticles) {
      setArticles((prevState) => {
        return [...prevState, mapValue[carouselIndex]];
      });
    }
  };

  useEffect(() => renderPaginatedDataSet(), [carouselIndex]);

  /** Pagination on pointer drag */
  const carouselRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (window.innerWidth >= 1410) return;

    if (!carouselRef.current || !carouselRef.current.children) return;
    const lastCarouselNode = carouselRef.current.children[carouselRef.current.children.length - 1];

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (entry.isIntersecting) setCarouselIndex(Math.max(0, Math.min(carouselIndex + 1, mapValue.length - 1)));
      },
      {
        threshold: 1.0,
      }
    );

    observer.observe(lastCarouselNode);
    return () => observer.unobserve(lastCarouselNode);
  }, []);

  /** Horizontal Navigation */
  const navigate = (): void => {
    if (!carouselRef.current || !carouselRef.current.children) return;

    // Target indexes and elements
    const targetIndex: number = carouselIndex * maxVisibleCarouselNodes;
    const targetElement = carouselRef.current.children[targetIndex] as HTMLLIElement;
    const lastElement = carouselRef.current.children[articlesFlatMap.findLastIndex((obj) => obj)] as HTMLLIElement;

    // Element boundaries
    let targetElementPosition: number;

    !targetElement ? (targetElementPosition = lastElement.offsetLeft) : (targetElementPosition = targetElement.offsetLeft);

    // Positions
    const carouselPosition: number = carouselRef.current.offsetLeft;
    const scrollPosition: number = targetElementPosition - carouselPosition;

    // Scroll
    carouselRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  };

  useEffect(() => navigate(), [articles, carouselIndex]);

  /** Component heading */
  const formattedDataKey: string = dataKey.replaceAll('_', ' ');

  return (
    <section className='fdMedia__carousel' data-anim={mapIndex === 0 ? 'active' : 'disabled'}>
      <h2 className='fdMedia__carousel__header'>{formattedDataKey}</h2>
      <div className='fdMedia__carousel__wrapper'>
        <ul className='fdMedia__carousel__wrapper__ul' ref={carouselRef}>
          <FDCarouselArticles articles={articlesFlatMap} setHeroData={setHeroData} mapIndex={mapIndex} />
        </ul>
        <nav className='fdMedia__carousel__wrapper__navigation'>
          <button className='fdMedia__carousel__wrapper__navigation--button' aria-label={'Show Previous'} onClick={() => updateCarouselIndex(-1)}>
            <picture>
              <MaterialSymbolsChevronLeft />
            </picture>
          </button>
          <button className='fdMedia__carousel__wrapper__navigation--button' aria-label={'Show More'} onClick={() => updateCarouselIndex(1)}>
            <picture>
              <MaterialSymbolsChevronRight />
            </picture>
          </button>
        </nav>
      </div>
    </section>
  );
};

export default FDCarousel;
