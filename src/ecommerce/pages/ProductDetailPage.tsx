import Header from '../components/navigation/header/Header';
import Footer from '../components/navigation/footer/eFooter';
import ProductPage from '../components/product/product-page/ProductPage';

const ProductDetailPage = (): JSX.Element => {
  return (
    <div data-theme="eco-light-mode">
      <Header />
      <ProductPage />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
