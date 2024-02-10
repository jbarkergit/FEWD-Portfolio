// components
import FDCarouselHeader from '../components/carousels/carousel-headers/FDCarouselHeader';
import FDCarouselChildLP from '../components/carousels/carousel-children/FDCarouselChildLP';
import FDCarouselChildTopTen from '../components/carousels/carousel-children/FDCarouselChildTopTen';

// types
import { TmdbDataUnionArrayType } from '../api/types/TmdbDataTypes';

// Param Types
type useCreateCarouselParamTypes = {
  heading: string;
  landscape?: boolean;
  portrait?: boolean;
  topten?: boolean;
  data: TmdbDataUnionArrayType;
};

// Carousel Creation Hook
const useCreateCarousel = ({ heading, landscape, portrait, topten, data }: useCreateCarouselParamTypes) => {
  return (
    <section className='fdCarousel'>
      <FDCarouselHeader heading={heading} />
      <div className='fdCarousel__container'>
        {landscape ? <FDCarouselChildLP data={data} /> : null}
        {portrait ? <FDCarouselChildLP data={data} /> : null}
        {topten ? <FDCarouselChildTopTen data={data} /> : null}
      </div>
    </section>
  );
};

export default useCreateCarousel;
