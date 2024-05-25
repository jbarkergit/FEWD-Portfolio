import { RefObject, useState } from 'react';

import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

import FDCarouselNav from './FDCarouselNav';
import FDCarouselArticles from './FDCarouselArticles';

import { Type_PaginatedDataMap } from '../../pages/FilmDatabase';

type Type_PropDrill = {
  dataKey: string;
  dataArr: Type_Tmdb_Api_Union[];
  useComponentProps: {
    fdMediaRef: RefObject<HTMLElement>;
    carouselUlRef: RefObject<HTMLUListElement>;
    tmdbDataArr: Type_PaginatedDataMap | undefined;
    visibleNodesCount: number;
  };
};

const FDCarousel = ({ dataKey, dataArr, useComponentProps }: Type_PropDrill) => {
  const heading: string = dataKey.replaceAll('_', ' ');
  const { fdMediaRef, carouselUlRef, tmdbDataArr, visibleNodesCount } = useComponentProps;

  /** Pagination */
  const [paginatedData, setPaginatedData] = useState<typeof dataArr>(dataArr);

  const paginate = (paginationIndex: number) => {
    if (tmdbDataArr) {
      const tmdbDataTarget: Type_Tmdb_Api_Union[] | undefined = tmdbDataArr.get(dataKey);
      const tmdbDataTargetLength: number | undefined = tmdbDataTarget?.length;

      const paginatedDataTargetLength: number = dataArr.length;

      const isPaginationComplete: boolean = tmdbDataTargetLength === paginatedDataTargetLength;

      if (!isPaginationComplete) {
        const paginationLength: number = visibleNodesCount * paginationIndex;
        const paginatedData: Type_Tmdb_Api_Union[] | undefined = tmdbDataTarget?.slice(paginatedDataTargetLength + 1, paginationLength);
        if (paginatedData) setPaginatedData(paginatedData);
      }
    }
  };

  return (
    <section className='fdMedia__carousel' aria-label={`${heading} Section`}>
      <h2 className='fdMedia__carousel__header'>{heading}</h2>
      <div className='fdMedia__carousel__wrapper'>
        <FDCarouselArticles data={paginatedData} />
        <FDCarouselNav paginate={paginate} maxPaginationIndex={tmdbDataArr?.get(dataKey)?.length} />
      </div>
    </section>
  );
};

export default FDCarousel;
