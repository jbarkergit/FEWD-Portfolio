import Header from '../layouts/navigation/Header';
import Footer from '../layouts/navigation/Footer';
import Infographic from '../layouts/home/Infographic';
import Carousel from '../components/home/Carousel';
import SideBySide from '../layouts/home/SideBySide';
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
