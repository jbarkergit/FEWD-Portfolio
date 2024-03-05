import { useFormatApiKey } from '../../../hooks/useFormatApiKey';

type PropType = {
  heading: string;
};

const FDCarouselHeading = ({ heading }: PropType) => {
  return (
    <h2 className='fdCarousel__heading'>
      <div className='fdCarousel__heading__textBlock'>{useFormatApiKey(heading)}</div>
    </h2>
  );
};

export default FDCarouselHeading;
