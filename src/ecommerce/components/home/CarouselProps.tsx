import { Link } from 'react-router-dom';

type carouselPropTypes = { carouselImg: string; carouselAlt: string; carouselActivity: string; navCat: string };

const CarouselProps = ({ carouselImg, carouselAlt, carouselActivity, navCat }: carouselPropTypes): JSX.Element => {
  return (
    <div className="carousel__track__slider">
      <picture className={`carousel__track__slide ${carouselActivity}`}>
        <img src={carouselImg} alt={carouselAlt} draggable="false" loading="lazy" decoding="async" fetchpriority="low" />
      </picture>
      <Link to="">{navCat}</Link>
    </div>
  );
};

export default CarouselProps;
