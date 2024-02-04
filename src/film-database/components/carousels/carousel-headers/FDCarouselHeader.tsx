import { useCreateCarouselTypes } from '../../../component-creation/carousel/useCreateCarousel';

const FDCarouselHeader = ({ heading }: useCreateCarouselTypes) => {
  return (
    <div className='fdCarousel__header'>
      <span className='fdCarousel__header__container'>
        <h2 className='fdCarousel__header__container--h2'>{heading}</h2>
      </span>
    </div>
  );
};

export default FDCarouselHeader;
