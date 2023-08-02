import { Link } from 'react-router-dom';

type carouselPropTypes = { carouselImg: string; carouselAlt: string; navCat: string };

const CarouselProps = ({ carouselImg, carouselAlt, navCat }: carouselPropTypes): JSX.Element => {
  return (
    <>
      <picture>
        <img src={carouselImg} alt={carouselAlt} draggable="false" loading="lazy" decoding="async" fetchpriority="low" />
        <Link to="">{navCat}</Link>
      </picture>
    </>
  );
};

export default CarouselProps;
