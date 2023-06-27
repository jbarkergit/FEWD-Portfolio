import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ProductDatabase } from '../../assets/production-data/ProductDatabase';
import { ProductType } from '../../context/exports/types';

const ProductShowcase = () => {
  // {ProductDatabase.filter((product) => product.productshowcase === true).map((product: ProductType) => (
  return (
    <section className="showcase">
      <section className="showcase__heading">
        <h2>
          All new drops <span className="highlight">available now</span>
        </h2>
      </section>
      <section className="showcase__products">
        <ul>
          {ProductDatabase.filter((product) => product.productshowcase === true).map((product: ProductType) => (
            <li className="productGrid__product" key={uuidv4()}>
              <Link to={`/ecommerce/product/${product.sku}`}>
                <span className="productGrid__product--containedHover">
                  <picture>
                    <img src={product.images![0]} alt={product.unit} loading="lazy" decoding="async" fetchpriority="high" />
                  </picture>
                </span>
              </Link>
              {/* <div className="productGrid__product__information">
                <Link to={`/ecommerce/product/${product.sku}`}>
                  <h2>
                    {product.company} {product.unit}
                  </h2>
                </Link>
              </div> */}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default ProductShowcase;
