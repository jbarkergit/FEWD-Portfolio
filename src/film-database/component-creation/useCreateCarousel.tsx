import { createContext, useContext } from 'react';
import FDCarouselHeader from '../components/carousels/carousel-headers/FDCarouselHeader';
import FDCarouselChildLP from '../components/carousels/carousel-children/FDCarouselChildLP';
import FDCarouselChildTopTen from '../components/carousels/carousel-children/FDCarouselChildTopTen';

// Prop Types
type useCreateCarouselPropTypes = {
  heading: string;
  landscape?: boolean;
  portrait?: boolean;
  topten?: boolean;
};

// Carousel Creation Hook
const useCreateCarousel = ({ heading, landscape, portrait, topten }: useCreateCarouselPropTypes) => {
  return (
    <section className='fdCarousel'>
      <section>
        <FDCarouselHeader />
        {landscape ? <FDCarouselChildLP /> : null}
        {portrait ? <FDCarouselChildLP /> : null}
        {topten ? <FDCarouselChildTopTen /> : null}
      </section>
    </section>
  );
};

export default useCreateCarousel;
