import { useParams } from 'react-router-dom';
import Header from '../layouts/navigation/Header';
import ProductPageProps from '../components/props/products/ProductPageProps';
import Footer from '../layouts/navigation/Footer';

const ProductPage = () => {
  const { productId } = useParams();
  //const product = AllProducts.find((product) => product.id === productId);
  const { id, productImg, productCompany, productName, productDescription, productPrice } = product;

  return (
    <>
      <Header />
      <ProductPageProps
        id={id}
        productImg={productImg}
        productCompany={productCompany}
        productName={productName}
        productDescription={productDescription}
        productPrice={productPrice}
      />
      <Footer />
    </>
  );
};

export default ProductPage;
