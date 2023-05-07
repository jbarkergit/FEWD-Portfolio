import Header from '../../layouts/navigation/Header';
import Footer from '../../layouts/navigation/Footer';
import Infographic from '../../layouts/home/Infographic';
import Carousel from '../../layouts/home/Carousel';
import SideBySide from '../../layouts/home/SideBySide';
import ProductCarousel from '../../layouts/home/ProductCarousel';

const Home = () => {
  return (
    <>
      <Header />
      <Infographic />
      <Carousel />
      <SideBySide />
      <ProductCarousel />
      <ProductCarousel />
      <Footer />
    </>
  );
};

export default Home;
