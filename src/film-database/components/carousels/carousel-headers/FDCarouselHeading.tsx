type PropType = {
  heading: string;
};

const FDCarouselHeading = ({ heading }: PropType) => {
  return (
    <h2 className='fdCarousel__heading'>
      <div className='fdCarousel__heading__textBlock'>{heading.split(/(?=[A-Z])/).join(' ')}</div>
    </h2>
  );
};

export default FDCarouselHeading;
