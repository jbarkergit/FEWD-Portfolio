import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ProductDatabase } from '../../assets/production-data/ProductDatabase';
import { ProductType } from '../../context/exports/types';

const ProductHighlight = (): JSX.Element => {
  return (
    <section className="productHighlight">
      <h2 className="productHighlight__heading">
        <span>
          <span className="highlight">New</span> drops available now
        </span>
      </h2>
      <ul>
        {ProductDatabase.filter((product: ProductType) => product.productshowcase === true).map((product: ProductType) => (
          <li key={uuidv4()}>
            <Link to={`/ecommerce/product/${product.sku}`}>
              <article>
                <picture>
                  <img src={product.images![0]} alt={`${product.company} ${product.unit}`} loading="lazy" decoding="async" fetchpriority="low" />
                </picture>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductHighlight;
