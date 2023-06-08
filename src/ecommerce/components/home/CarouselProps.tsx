type carouselPropTypes = { carouselImg: string; carouselAlt: string };

const CarouselProps = ({ carouselImg, carouselAlt }: carouselPropTypes) => {
  return (
    <div className="carousel__track__slide">
      <picture>
        <img src={carouselImg} alt={carouselAlt} loading="lazy" decoding="async" fetchpriority="low" />
      </picture>
    </div>
  );
};

export default CarouselProps;
