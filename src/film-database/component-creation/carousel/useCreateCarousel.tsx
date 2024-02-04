import { createContext, useContext } from 'react';
import FDCarouselHeader from '../../components/carousels/carousel-headers/FDCarouselHeader';
import FDCarouselChildLP from '../../components/carousels/carousel-children/FDCarouselChildLP';
import FDCarouselChildTopTen from '../../components/carousels/carousel-children/FDCarouselChildTopTen';

// Prop Types
type useCreateCarouselPropTypes = {
  heading: string;
  landscape?: boolean;
  portrait?: boolean;
  topten?: boolean;
};

// Prop Context
const UseCreateCarouselContext = createContext<useCreateCarouselPropTypes | undefined>(undefined);

// Export Props
export const useCreateCarouselProps = useContext(UseCreateCarouselContext);

// Carousel Creation Hook
const useCreateCarousel = ({ ...props }: useCreateCarouselPropTypes) => {
  return (
    <section className='fdCarousel'>
      <UseCreateCarouselContext.Provider value={props}>
        <FDCarouselHeader />
        {props.landscape ? <FDCarouselChildLP /> : null}
        {props.portrait ? <FDCarouselChildLP /> : null}
        {props.topten ? <FDCarouselChildTopTen /> : null}
      </UseCreateCarouselContext.Provider>
    </section>
  );
};

export default useCreateCarousel;
