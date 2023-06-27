import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Header from '../layouts/navigation/Header';
import Footer from '../layouts/navigation/Footer';
import NotFound from '../../shared/pages/NotFound';

import { ProductDatabase } from '../assets/production-data/ProductDatabase';
import { ProductType } from '../context/exports/types';

const getProductBySku = () => {
  const { paramId } = useParams() as { paramId: string };
  const findProduct = ProductDatabase.find((product: ProductType) => product.sku === paramId)!;

  const useProductImages = () => {
    uuidv4();

    return (
      <>
        {findProduct.images!.map((image) => (
          <picture key={uuidv4()}>
            <img src={image} alt={findProduct.company + findProduct.unit} role="presentation" decoding="async" fetchpriority="high" />
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
            <span>
              <h1>
                {findProduct.company} {findProduct.unit}
              </h1>
            </span>
            <span className="skuPage__details--price">{Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(findProduct.price)}</span>
            <span>
              <p>{findProduct.description}</p>
            </span>
            <span>
              <button className="skuPage__details--quickAdd">
                <i className="fa-solid fa-cart-plus"></i>
              </button>
            </span>
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
