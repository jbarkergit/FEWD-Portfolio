import { Link } from 'react-router-dom';

type carouselPropTypes = { carouselImg: string; carouselAlt: string; navCat: string };

const CarouselProps = ({ carouselImg, carouselAlt, navCat }: carouselPropTypes): JSX.Element => {
  return (
    <figure>
      <picture>
        <img src={carouselImg} alt={carouselAlt} draggable='false' loading='lazy' decoding='async' fetchpriority='low' />
        <figcaption>{`${carouselAlt}`}</figcaption>
        <Link to=''>{navCat}</Link>
      </picture>
    </figure>
  );
};

export default CarouselProps;
