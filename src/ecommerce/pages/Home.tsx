import Header from '../components/navigation/header/Header';
import EFooter from '../components/navigation/footer/eFooter';
import Infographic from '../components/home/Infographic';
import Carousel from '../components/home/Carousel';
import SideBySide from '../components/home/SideBySide';
import ProductHighlight from '../components/home/ProductHighlight';

const Home = (): JSX.Element => {
  return (
    <>
      <Header />
      <Infographic />
      <Carousel />
      <SideBySide />
      <ProductHighlight />
      <EFooter />
    </>
  );
};

export default Home;
