import { Link } from 'react-router-dom';

type carouselPropTypes = { carouselImg: string; carouselPost: string; link: string };

function CarouselProps({ carouselImg, carouselPost, link }: carouselPropTypes) {
  return (
    <div className="carousel__track__slide">
      <Link to={link}>
        <img src={carouselImg} alt={carouselPost} loading="lazy" />
      </Link>
    </div>
  );
}

export default CarouselProps;
