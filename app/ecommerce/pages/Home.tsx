// Context
import { CartProvider } from '../context/CartContext';

// Components
import Header from '../components/navigation/header-desktop/EcoHeader';
import EFooter from '../components/navigation/footer/eFooter';
import Infographic from '../components/home/Infographic';
import Carousel from '../components/home/Carousel';
import SideBySide from '../components/home/SideBySide';
import ProductHighlight from '../components/home/ProductHighlight';

const EcommerceHome = () => {
  return (
    <CartProvider>
      <div id='ecommerce'>
        <Header />
        <Infographic />
        <Carousel />
        <SideBySide />
        <ProductHighlight />
        <EFooter />
      </div>
    </CartProvider>
  );
};

export default EcommerceHome;
