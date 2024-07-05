import { Link } from 'react-router-dom';

type carouselPropTypes = { carouselImg: string; carouselAlt: string; navCat: string; linkTo: string; tabIndex?: number };

const CarouselProps = ({ carouselImg, carouselAlt, navCat, linkTo, tabIndex }: carouselPropTypes): JSX.Element => {
  return (
    <figure>
      <picture>
        <img src={carouselImg} alt={carouselAlt} draggable='false' loading='lazy' decoding='async' fetchPriority='low' />
        <figcaption>{`${carouselAlt}`}</figcaption>
        <Link to={linkTo} tabIndex={tabIndex}>
          {navCat}
        </Link>
      </picture>
    </figure>
  );
};

export default CarouselProps;
