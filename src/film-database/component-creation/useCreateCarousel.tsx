import { createContext, useContext } from 'react';
import FDCarouselHeader from '../components/carousels/carousel-headers/FDCarouselHeader';
import FDCarouselChildLP from '../components/carousels/carousel-children/FDCarouselChildLP';
import FDCarouselChildTopTen from '../components/carousels/carousel-children/FDCarouselChildTopTen';
import { PhDotsThreeVerticalBold } from '../icons/PhDotsThreeVerticalBold';
import useCreatePicture from './useCreatePicture';

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
const useCreateCarousel = ({ ...props }: useCreateCarouselPropTypes) => {
  return (
    <section className='fdCarousel'>
      <UseCreateCarouselContext.Provider value={props}>
        <FDCarouselHeader />
        {props.landscape ? <FDCarouselChildLP /> : null}
        {props.portrait ? <FDCarouselChildLP /> : null}
        {props.topten ? <FDCarouselChildTopTen /> : null}
      </UseCreateCarouselContext.Provider>
      <div className='fdCarousel__block__navigation'>
        <div className='fdCarousel__block__navigation--left'>
          {useCreatePicture({ svg: <PhDotsThreeVerticalBold />, alt: 'More Information', figcaption: 'More Information Selector' })}
        </div>
        <div className='fdCarousel__block__navigation--right'>
          <figure>
            <picture>
              <PhDotsThreeVerticalBold />
              <figcaption>More Information</figcaption>
            </picture>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default useCreateCarousel;
