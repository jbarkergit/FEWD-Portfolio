import MaterialLeftCaret from '../../assets/svg-icons/MaterialLeftCaret';
import MaterialRightCaret from '../../assets/svg-icons/MaterialRightCaret';
import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

import FDCarouselArticles from './FDCarouselArticles';
import FDCarouselButton from './FDCarouselButton';

type Type_FilmDatabase_Props = { dataKey: string; mapValue: Type_Tmdb_Api_Union[][] };

const FDCarousel = ({ dataKey, mapValue }: Type_FilmDatabase_Props) => {
  const formattedDataKey: string = dataKey.replaceAll('_', ' ');
  const flattenedArray = mapValue.flatMap((innerArray) => innerArray);

  const updateNavigationIndex = () => {};

  return (
    <section className='fdMedia__carousel' aria-label={`${formattedDataKey} Section`}>
      <h2 className='fdMedia__carousel__header'>{formattedDataKey}</h2>
      <div className='fdMedia__carousel__wrapper'>
        <FDCarouselArticles articles={flattenedArray} />
        <nav className='fdMedia__carousel__wrapper__navigation'>
          <FDCarouselButton caption={'Show Previous'} icon={<MaterialLeftCaret />} func={updateNavigationIndex} funcIndex={-1} />
          <FDCarouselButton caption={'Show More'} icon={<MaterialRightCaret />} func={updateNavigationIndex} funcIndex={1} />
        </nav>
      </div>
    </section>
  );
};

export default FDCarousel;
