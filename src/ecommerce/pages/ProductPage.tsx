import { useParams } from 'react-router-dom';

import Header from '../layouts/navigation/Header';
import Footer from '../layouts/navigation/Footer';
import NotFound from '../../shared/pages/NotFound';

import { ProductDatabase } from '../data/ProductDatabase';
import { ProductType } from '../context/ProductProvider';

const getProductBySku = () => {
  const { paramId } = useParams() as { paramId: string };
  const findProduct = ProductDatabase.find((product: ProductType) => product.sku === paramId);

  if (!findProduct) {
    return (
      <>
        <h1>test</h1>
        {/* <NotFound /> */}
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div className="productPage flexBox" key={findProduct.sku}>
          <section className="productPhotos flexBox justifyCenter">
            <button>
              <picture data-status="active">
                <img src={findProduct.srcset} alt={`${findProduct.company} ${findProduct.unit} `} />
              </picture>
            </button>
            <button>
              <picture data-status="inactive">
                <img src={findProduct.srcset} alt={`${findProduct.company} ${findProduct.unit} `} />
              </picture>
            </button>
            <button>
              <picture data-status="inactive">
                <img src={findProduct.srcset} alt={`${findProduct.company} ${findProduct.unit} `} />
              </picture>
            </button>
          </section>
          <section className="activeProductPhoto flexBox justifyCenter">
            <picture>
              <img src={findProduct.srcset} alt={`${findProduct.company} ${findProduct.unit} `} />
            </picture>
          </section>
          <main className="productPlate flexBox flexColumn alignUnset">
            <span>
              <h1>
                {findProduct.company}
                {findProduct.unit}
              </h1>
            </span>
            <ul>
              <li>
                <h2>About {findProduct.unit}</h2>
              </li>
              <li>
                <p>{findProduct.description}</p>
              </li>
              <li className="linebreak" />
              <li>{findProduct.price}</li>
              <li>ADD TO CART</li>
            </ul>
          </main>
        </div>
        <Footer />
      </>
    );
  }
};

const ProductPage = () => {
  return <>{getProductBySku()}</>;
};

export default ProductPage;
