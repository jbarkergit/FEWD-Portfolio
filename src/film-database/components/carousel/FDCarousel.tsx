import { RefObject } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

import FDCarouselNav from './FDCarouselNav';
import FDCarouselArticles from './FDCarouselArticles';

type Type_PropDrill = {
  key: string;
  data: Type_Tmdb_Api_Union[];
  useComponentProps: {
    fdMediaRef: RefObject<HTMLElement>;
    carouselUlRef: RefObject<HTMLUListElement>;
    visibleNodesCount: number;
  };
};

const FDCarousel = ({ key, data, useComponentProps }: Type_PropDrill) => {
  const heading: string = key.replaceAll('_', ' ');
  const { fdMediaRef, carouselUlRef, visibleNodesCount } = useComponentProps;

  return (
    <section className='fdMedia__carousel' key={uuidv4()} aria-label={`${heading} Section`}>
      <h2 className='fdMedia__carousel__header'>{heading}</h2>
      <div className='fdMedia__carousel__wrapper'>
        <FDCarouselArticles data={data} />
        <FDCarouselNav />
      </div>
    </section>
  );
};

export default FDCarousel;
