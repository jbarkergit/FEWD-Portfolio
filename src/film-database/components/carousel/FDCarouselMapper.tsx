import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Type_Tmdb_ApiCall_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

import FDCarouselMapperPoster from './FDCarouselMapperPoster';

type Type_PropDrill = {
  grid: boolean;
  dataValue: Type_Tmdb_ApiCall_Union[];
  paginatedData: Type_Tmdb_ApiCall_Union[];
  useFetchTrailer: (index: number) => void;
};

const FDCarouselMapper = ({ grid, dataValue, paginatedData, useFetchTrailer }: Type_PropDrill) => {
  const carouselUl = useRef<HTMLUListElement>(null);

  return (
    <ul className='FDMediaGrid__wrapper__ul' data-status={grid ? 'grid' : 'carousel'} ref={carouselUl}>
      {grid
        ? dataValue.map((values) => <FDCarouselMapperPoster mapValue={values} grid={grid} useFetchTrailer={useFetchTrailer} key={uuidv4()} />)
        : paginatedData.map((values) => <FDCarouselMapperPoster mapValue={values} grid={grid} useFetchTrailer={useFetchTrailer} key={uuidv4()} />)}
    </ul>
  );
};
export default FDCarouselMapper;
