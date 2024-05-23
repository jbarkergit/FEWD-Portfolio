import { RefObject } from 'react';

import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

import FDCarouselNav from './FDCarouselNav';
import FDCarouselArticles from './FDCarouselArticles';

type Type_PropDrill = {
  dataKey: string;
  dataArr: Type_Tmdb_Api_Union[];
  useComponentProps: {
    fdMediaRef: RefObject<HTMLElement>;
    carouselUlRef: RefObject<HTMLUListElement>;
    visibleNodesCount: number;
  };
};

const FDCarousel = ({ dataKey, dataArr, useComponentProps }: Type_PropDrill) => {
  const heading: string = dataKey.replaceAll('_', ' ');
  const { fdMediaRef, carouselUlRef, visibleNodesCount } = useComponentProps;

  return (
    <section className='fdMedia__carousel' aria-label={`${heading} Section`}>
      <h2 className='fdMedia__carousel__header'>{heading}</h2>
      <div className='fdMedia__carousel__wrapper'>
        <FDCarouselArticles data={dataArr} />
        <FDCarouselNav />
      </div>
    </section>
  );
};

export default FDCarousel;
