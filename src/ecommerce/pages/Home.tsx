// Context
import { CategoryFilterProvider } from '../context/CategoryFilterContext';
import { CartProvider } from '../context/CartContext';

// Components
import Header from '../components/navigation/header/Header';
import EFooter from '../components/navigation/footer/eFooter';
import Infographic from '../components/home/Infographic';
import Carousel from '../components/home/Carousel';
import SideBySide from '../components/home/SideBySide';
import ProductHighlight from '../components/home/ProductHighlight';

const EcommerceHome = (): JSX.Element => {
  return (
    <CategoryFilterProvider>
      <CartProvider>
        <Header />
        <Infographic />
        <Carousel />
        <SideBySide />
        <ProductHighlight />
        <EFooter />
      </CartProvider>
    </CategoryFilterProvider>
  );
};

export default EcommerceHome;
