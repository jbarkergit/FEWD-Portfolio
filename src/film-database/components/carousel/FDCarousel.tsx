import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

import FDCarouselArticles from './FDCarouselArticles';

type Type_FilmDatabase_Props = { dataKey: string; mapValue: Type_Tmdb_Api_Union[][] };

const FDCarousel = ({ dataKey, mapValue }: Type_FilmDatabase_Props) => {
  const formattedDataKey: string = dataKey.replaceAll('_', ' ');
  const flattenedArray = mapValue.flatMap((innerArray) => innerArray);

  return (
    <section className='fdMedia__carousel' aria-label={`${formattedDataKey} Section`}>
      <h2 className='fdMedia__carousel__header'>{formattedDataKey}</h2>
      <FDCarouselArticles articles={flattenedArray} />
    </section>
  );
};

export default FDCarousel;
