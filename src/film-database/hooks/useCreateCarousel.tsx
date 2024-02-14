// components
import FDCarouselHeading from '../components/carousels/carousel-headers/FDCarouselHeading';
import FDCarouselChildLP from '../components/carousels/carousel-children/FDCarouselChildLP';
import FDCarouselChildTopTen from '../components/carousels/carousel-children/FDCarouselChildTopTen';

// types
import { TmdbDataUnionArrayType } from '../api/types/TmdbDataTypes';

// Param Types
type useCreateCarouselParamTypes = {
  heading: string;
  topten?: boolean;
  dataObject: TmdbDataUnionArrayType;
};

// Carousel Creation Hook
const useCreateCarousel = ({ heading, topten, dataObject }: useCreateCarouselParamTypes) => {
  return (
    <section className='fdCarousel'>
      <FDCarouselHeading heading={heading} />
      <div className='fdCarousel__wrapper'>{topten ? <FDCarouselChildTopTen dataObject={dataObject} /> : <FDCarouselChildLP dataObject={dataObject} />}</div>{' '}
      <nav className='fdCarousel__navigation'>
        <button className='fdCarousel__navigation--button'></button>
        <button className='fdCarousel__navigation--button'></button>
      </nav>
    </section>
  );
};

export default useCreateCarousel;
