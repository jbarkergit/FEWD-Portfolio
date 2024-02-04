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

/** Prop Context
 * Creation
 * Export
 */
const UseCreateCarouselContext = createContext<useCreateCarouselPropTypes | undefined>(undefined);

export const useCreateCarouselProps = () => {
  const contextValue = useContext(UseCreateCarouselContext);
  if (contextValue) return contextValue;
  else throw new Error('Failure at CreateCarouselProps Provider');
};

// Carousel Creation Hook
const useCreateCarousel = () => {
  const props = useCreateCarouselProps();

  return (
    <section className='fdCarousel'>
      <section>
        <UseCreateCarouselContext.Provider value={props}>
          <FDCarouselHeader />
          {props.landscape ? <FDCarouselChildLP /> : null}
          {props.portrait ? <FDCarouselChildLP /> : null}
          {props.topten ? <FDCarouselChildTopTen /> : null}
        </UseCreateCarouselContext.Provider>
      </section>
    </section>
  );
};

export default useCreateCarousel;
