import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ProductType } from '../../../types/ProductType';
import useProductFilter from '../../../hooks/useProductFilter';

type MoreLikeThisType = {
  findProduct: ProductType;
};

const MoreLikeThis = ({ findProduct }: MoreLikeThisType): JSX.Element => {
  const filteredRecommenders = useProductFilter().filter((product) => product.sku !== findProduct.sku);
  const [useRecommender, setUseRecommender] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 30, behavior: 'smooth' });
    setTimeout(() => setUseRecommender(false), 150);
  }, [useRecommender]);

  return (
    <section className="recommenders" style={{ backgroundColor: 'transparent' }}>
      <h2 className="recommenders__header">
        More {findProduct.category}s like {findProduct.unit}
      </h2>
      <ul className="recommenders__unorderedList">
        {filteredRecommenders.splice(0, 8).map((product) => (
          <li key={uuidv4()} className="recommenders__unorderedList__item">
            <Link to={`/ecommerce/product/${product.sku}`} onClick={() => setUseRecommender(true)}>
              <article>
                <picture>
                  <img src={product.images![0]} alt={`${product.company} ${product.unit}`} loading="lazy" decoding="async" fetchpriority="low" />
                </picture>
                <hgroup>
                  <h3>{product.company}</h3>
                  <h2>{product.unit}</h2>
                  <h4>Starting at {Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(product.price)}</h4>
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
