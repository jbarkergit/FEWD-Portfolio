import { useParams } from 'react-router-dom';

import Header from '../layouts/navigation/Header';
import Footer from '../layouts/navigation/Footer';
import NotFound from '../../shared/pages/NotFound';

import { ProductDatabase } from '../assets/production-data/ProductDatabase';
import { ProductType } from '../context/exports/types';

const getProductBySku = () => {
  const { paramId } = useParams() as { paramId: string };
  const findProduct = ProductDatabase.find((product: ProductType) => product.sku === paramId)!;

  const useProductImages = () => {
    return (
      <>
        {findProduct.images!.map((image) => (
          <picture>
            <img src={image} alt={`${findProduct.company} ${findProduct.unit}`} role="presentation" loading="lazy" decoding="async" fetchpriority="high" />
          </picture>
        ))}
      </>
    );
  };

  if (!findProduct) {
    return (
      <>
        <NotFound />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <section className="skuPage">
          <section className="skuPage__imgBlock">{useProductImages()}</section>
          <main className="skuPage__details">
            <ul>
              <li>
                <h1>
                  {findProduct.company} {findProduct.unit}
                </h1>
              </li>
              <li>
                <p>{findProduct.description}</p>
              </li>
              <li>{Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(findProduct.price)}</li>
              <li>ADD TO CART</li>
            </ul>
          </main>
        </section>
        <Footer />
      </>
    );
  }
};

const ProductPage = () => {
  return <>{getProductBySku()}</>;
};

export default ProductPage;
