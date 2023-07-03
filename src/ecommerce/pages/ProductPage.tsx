import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Header from '../components/navigation/header/Header';
import Footer from '../components/navigation/footer/eFooter';
import NotFound from '../../shared/pages/NotFound';

import { ProductDatabase } from '../assets/production-data/ProductDatabase';
import { ProductType } from '../context/types';

const getProductBySku = (): JSX.Element => {
  const { paramId } = useParams() as { paramId: string };
  const findProduct = ProductDatabase.find((product: ProductType) => product.sku === paramId)!;

  const useProductImages = (): JSX.Element => {
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
        <main className="skuPage">
          <aside className="skuPage__imgBlock">{useProductImages()}</aside>
          <article className="skuPage__details">
            <span>
              <h1>
                {findProduct.company} {findProduct.unit}
              </h1>
            </span>
            <span>
              <h3>{Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(findProduct.price)}</h3>
            </span>
            <span>
              <p>{findProduct.description}</p>
            </span>
            <span>
              <button className="skuPage__details--quickAdd">
                <i className="fa-solid fa-cart-plus"></i>
              </button>
            </span>
          </article>
        </main>
        <Footer />
      </>
    );
  }
};

const ProductPage = (): JSX.Element => {
  return <>{getProductBySku()}</>;
};

export default ProductPage;
