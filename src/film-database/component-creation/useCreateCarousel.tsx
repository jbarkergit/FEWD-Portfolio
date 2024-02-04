import FDCarouselHeader from '../components/carousels/carousel-headers/FDCarouselHeader';
import FDCarouselChildLP from '../components/carousels/carousel-children/FDCarouselChildLP';
import FDCarouselChildTopTen from '../components/carousels/carousel-children/FDCarouselChildTopTen';

// Param Types
type useCreateCarouselParamTypes = {
  heading: string;
  landscape?: boolean;
  portrait?: boolean;
  topten?: boolean;
};

// Carousel Creation Hook
const useCreateCarousel = ({ heading, landscape, portrait, topten }: useCreateCarouselParamTypes) => {
  return (
    <section className='fdCarousel'>
      <div className='fdCarousel__container'>
        <FDCarouselHeader heading={heading} />
        {landscape ? <FDCarouselChildLP /> : null}
        {portrait ? <FDCarouselChildLP /> : null}
        {topten ? <FDCarouselChildTopTen /> : null}
      </div>
    </section>
  );
};

export default useCreateCarousel;
