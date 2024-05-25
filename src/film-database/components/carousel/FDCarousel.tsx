import { useEffect, useState } from 'react';

import MaterialLeftCaret from '../../assets/svg-icons/MaterialLeftCaret';
import MaterialRightCaret from '../../assets/svg-icons/MaterialRightCaret';
import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

import FDCarouselArticles from './FDCarouselArticles';
import FDCarouselButton from './FDCarouselButton';

type Type_FilmDatabase_Props = { dataKey: string; mapValue: Type_Tmdb_Api_Union[][] };

const FDCarousel = ({ dataKey, mapValue }: Type_FilmDatabase_Props) => {
  const formattedDataKey: string = dataKey.replaceAll('_', ' ');

  const [articles, setArticles] = useState<Type_Tmdb_Api_Union[][]>([mapValue[0]]);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  const updateCarouselIndex = (delta: number) => {
    setCarouselIndex(Math.max(0, Math.min(carouselIndex + delta, mapValue.length - 1)));
  };

  const renderPaginatedDataSet = () => {
    const isIndexInArticles: boolean = articles.some((_, index) => index === carouselIndex);

    if (!isIndexInArticles) {
      setArticles((prevState) => {
        return [...prevState, mapValue[carouselIndex]];
      });
    }
  };

  useEffect(() => renderPaginatedDataSet(), [carouselIndex]);

  return (
    <section className='fdMedia__carousel' aria-label={`${formattedDataKey} Section`}>
      <h2 className='fdMedia__carousel__header'>{formattedDataKey}</h2>
      <div className='fdMedia__carousel__wrapper'>
        {articles ? <FDCarouselArticles articles={articles.flatMap((innerArray) => innerArray)} /> : null}
        <nav className='fdMedia__carousel__wrapper__navigation'>
          <FDCarouselButton caption={'Show Previous'} icon={<MaterialLeftCaret />} func={updateCarouselIndex} funcDelta={-1} />
          <FDCarouselButton caption={'Show More'} icon={<MaterialRightCaret />} func={updateCarouselIndex} funcDelta={1} />
        </nav>
      </div>
    </section>
  );
};

export default FDCarousel;
