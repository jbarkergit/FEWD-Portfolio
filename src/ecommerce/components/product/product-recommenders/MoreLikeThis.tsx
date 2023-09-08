import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ProductType } from '../../../types/ProductType';
import { ProductDatabase } from '../../../assets/production-data/product-db/ProductDatabase';

type MoreLikeThisType = {
  findProduct: ProductType;
};

const MoreLikeThis = ({ findProduct }: MoreLikeThisType): JSX.Element => {
  const filteredRecommenders = ProductDatabase.filter((product) => product.sku !== findProduct.sku);

  return (
    <section className="recommenders" style={{ backgroundColor: 'transparent' }}>
      <h2 className="recommenders__header">
        More {findProduct.category} like <span className="highlight">{findProduct.unit}</span>
      </h2>
      <ul className="recommenders__unorderedList">
        {filteredRecommenders.splice(0, 8).map((product) => (
          <li key={uuidv4()} className="recommenders__unorderedList__item">
            <Link to={`/ecommerce/product/${product.sku}`} onClick={() => window.scrollTo({ top: 0 })}>
              <article>
                <picture>
                  <img src={product.images![0]} alt={`${product.company} ${product.unit}`} loading="lazy" decoding="async" fetchpriority="low" />
                </picture>
                <hgroup>
                  <h2>
                    {product.company} {product.unit}
                  </h2>
                  <h3>Starting at {Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(product.price)}</h3>
                </hgroup>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default MoreLikeThis;
