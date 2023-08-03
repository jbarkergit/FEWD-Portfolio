import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ProductType } from '../../../types/ProductType';
import useProductFilter from '../../../hooks/useProductFilter';

type MoreLikeThisType = {
  findProduct: ProductType;
};

const MoreLikeThis = ({ findProduct }: MoreLikeThisType): JSX.Element => {
  return (
    <section className="moreLikeThis">
      {useProductFilter()
        .splice(0, 10)
        .map((product) => (
          <li key={uuidv4()}>
            <h2>
              More {findProduct.category}s like {findProduct.unit}
            </h2>
            <Link to={`/ecommerce/product/${product.sku}`}>
              <article>
                <picture>
                  <img src={product.images![0]} alt={`${product.company} ${product.unit}`} loading="lazy" decoding="async" fetchpriority="low" />
                </picture>
                <div id="productHighlightInfo">
                  <h3>{product.company}</h3>
                  <h2>{product.unit}</h2>
                  <h4>Starting at {Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(product.price)}</h4>
                </div>
              </article>
            </Link>
          </li>
        ))}
    </section>
  );
};
export default MoreLikeThis;
