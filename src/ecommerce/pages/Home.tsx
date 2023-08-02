import Header from '../components/navigation/header/Header';
import Footer from '../components/navigation/footer/eFooter';
import Infographic from '../components/home/Infographic';
import Carousel from '../components/home/Carousel';
import SideBySide from '../components/home/SideBySide';
import ProductHighlight from '../components/home/ProductHighlight';

const Home = (): JSX.Element => {
  return (
    <div data-theme="eco-light-mode">
      <Header />
      <Infographic />
      <Carousel />
      <SideBySide />
      <ProductHighlight />
      <Footer />
    </div>
  );
};

export default Home;
