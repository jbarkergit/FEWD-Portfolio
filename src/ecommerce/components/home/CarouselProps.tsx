import { Link } from 'react-router-dom';

type carouselPropTypes = { carouselImg: string; carouselAlt: string; navCat: string; tabIndex?: number };

const CarouselProps = ({ carouselImg, carouselAlt, navCat, tabIndex }: carouselPropTypes): JSX.Element => {
  return (
    <figure>
      <picture>
        <img src={carouselImg} alt={carouselAlt} draggable='false' loading='lazy' decoding='async' fetchpriority='low' />
        <figcaption>{`${carouselAlt}`}</figcaption>
        <Link to='' tabIndex={tabIndex}>
          {navCat}
        </Link>
      </picture>
    </figure>
  );
};

export default CarouselProps;
