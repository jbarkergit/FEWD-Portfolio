import { useCreateCarouselProps } from '../../../component-creation/carousel/useCreateCarousel';

const FDCarouselChildLP = () => {
  const props = useCreateCarouselProps;

  return (
    <div className='fdCarousel__block'>
      <div className='fdCarousel__block__graphic'></div>
      <div className='fdCarousel__block__overlay'>
        <div className='fdCarousel__block__overlay__play'></div>
        <div className='fdCarousel__block__overlay__information'></div>
      </div>
      <div className='fdCarousel__block__navigation'>
        <div className='fdCarousel__block__navigation--left'></div>
        <div className='fdCarousel__block__navigation--right'></div>
      </div>
    </div>
  );
};

export default FDCarouselChildLP;
