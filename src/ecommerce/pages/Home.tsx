// Context
import { CartProvider } from '../context/CartContext';

// Components
import Header from '../components/navigation/header/EcoHeader';
import EFooter from '../components/navigation/footer/eFooter';
import Infographic from '../components/home/Infographic';
import Carousel from '../components/home/Carousel';
import SideBySide from '../components/home/SideBySide';
import ProductHighlight from '../components/home/ProductHighlight';

const EcommerceHome = (): JSX.Element => {
  return (
    <CartProvider>
      <Header />
      <Infographic />
      <Carousel />
      <SideBySide />
      <ProductHighlight />
      <EFooter />
    </CartProvider>
  );
};

export default EcommerceHome;
