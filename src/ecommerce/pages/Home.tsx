import Header from '../components/navigation/header/Header';
import Footer from '../components/navigation/footer/Footer';
import Infographic from '../components/home/Infographic';
import Carousel from '../components/home/Carousel';
import SideBySide from '../components/home/SideBySide';
import ProductHighlight from '../components/home/ProductHighlight';

const Home = () => {
  return (
    <>
      <Header />
      <Infographic />
      <Carousel />
      <SideBySide />
      <ProductHighlight />
      <Footer />
    </>
  );
};

export default Home;
