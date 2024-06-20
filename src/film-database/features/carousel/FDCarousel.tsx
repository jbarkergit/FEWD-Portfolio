import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

import FDCarouselArticles from '../../components/carousel/FDCarouselArticles';
import FDCarouselButton from '../../components/carousel/FDCarouselButton';

import { MaterialSymbolsChevronLeft, MaterialSymbolsChevronRight } from '../../assets/carouselSymbols';

type Type_FilmDatabase_Props = {
  dataKey: string;
  mapValue: Type_Tmdb_Api_Union[][];
  maxVisibleCarouselNodes: number;
  setHeroData: Dispatch<SetStateAction<Type_Tmdb_Api_Union | null>>;
};

const FDCarousel = ({ dataKey, mapValue, maxVisibleCarouselNodes, setHeroData }: Type_FilmDatabase_Props) => {
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

  /** Navigation */
  const carouselRef = useRef<HTMLUListElement>(null);

  const navigate = (): void => {
    if (!carouselRef.current || !carouselRef.current.children) return;

    // Target indexes and elements
    const targetIndex: number = carouselIndex * maxVisibleCarouselNodes;
    const targetArticleIndex: number = targetIndex === 0 ? 0 : targetIndex - 1;
    const targetElement = carouselRef.current.children[targetArticleIndex] as HTMLLIElement;
    const lastElement = carouselRef.current.children[articlesFlatMap.findLastIndex((obj) => obj)] as HTMLLIElement;

    // Element boundaries
    let targetElementPosition: number;

    if (!targetElement) {
      targetElementPosition = lastElement.offsetLeft;
    } else {
      targetElementPosition = targetElement.offsetLeft;
    }

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
    <section className='fdMedia__carousel' aria-label={`${formattedDataKey} Section`} data-index-tracker='active'>
      <h2 className='fdMedia__carousel__header'>{formattedDataKey}</h2>
      <div className='fdMedia__carousel__wrapper'>
        <ul className='fdMedia__carousel__wrapper__ul' data-layout='carousel' ref={carouselRef}>
          <FDCarouselArticles articles={articlesFlatMap} setHeroData={setHeroData} />
        </ul>
        <nav className='fdMedia__carousel__wrapper__navigation'>
          <FDCarouselButton caption={'Show Previous'} icon={<MaterialSymbolsChevronLeft />} func={updateCarouselIndex} funcDelta={-1} />
          <FDCarouselButton caption={'Show More'} icon={<MaterialSymbolsChevronRight />} func={updateCarouselIndex} funcDelta={1} />
        </nav>
      </div>
    </section>
  );
};

export default FDCarousel;
