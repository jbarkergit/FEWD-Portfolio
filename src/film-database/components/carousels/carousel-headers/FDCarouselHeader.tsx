import { useCreateCarouselProps } from '../../../component-creation/carousel/useCreateCarousel';

const FDCarouselHeader = () => {
  const props = useCreateCarouselProps();

  return (
    <div className='fdCarousel__header'>
      <span className='fdCarousel__header__container'>
        <h2 className='fdCarousel__header__container--h2'>{props.heading}</h2>
      </span>
    </div>
  );
};

export default FDCarouselHeader;
