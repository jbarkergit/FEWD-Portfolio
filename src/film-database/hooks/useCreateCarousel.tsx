// components
import FDCarouselHeading from '../components/carousels/carousel-headers/FDCarouselHeading';
import FDCarouselChildLP from '../components/carousels/carousel-children/FDCarouselChildLP';
import FDCarouselChildTopTen from '../components/carousels/carousel-children/FDCarouselChildTopTen';

// icons
import MaterialLeftCaret from '../icons/MaterialLeftCaret';
import MaterialRightCaret from '../icons/MaterialRightCaret';

// types
import { TmdbDataUnionArrayType } from '../api/types/TmdbDataTypes';
import useCreatePicture from './useCreatePicture';

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
      <div className='fdCarousel__wrapper'>
        {topten ? <FDCarouselChildTopTen dataObject={dataObject} /> : <FDCarouselChildLP dataObject={dataObject} />}
        <nav className='fdCarousel__wrapper__navigation'>
          <button className='fdCarousel__wrapper__navigation--button'>{useCreatePicture({ svg: <MaterialLeftCaret />, alt: 'Show Previous' })}</button>
          <button className='fdCarousel__wrapper__navigation--button'>{useCreatePicture({ svg: <MaterialRightCaret />, alt: 'Show More' })}</button>
        </nav>
      </div>
    </section>
  );
};

export default useCreateCarousel;
