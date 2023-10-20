import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ProductType } from '../../../types/ProductType';
import { ProductDatabase } from '../../../database/product-db/ProductDatabase';

type MoreLikeThisType = {
  findProduct: ProductType;
};

const MoreLikeThis = ({ findProduct }: MoreLikeThisType): JSX.Element => {
  const filteredRecommenders = ProductDatabase.filter((product) => product.sku !== findProduct.sku);

  //Force page refresh upon component change
  const { paramId } = useParams() as { paramId: string };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [paramId]);

  return (
    <aside className='recommenders' style={{ backgroundColor: 'transparent' }}>
      <h2 className='recommenders__header'>
        More {findProduct.category} like <span className='highlight'>{findProduct.unit}</span>
      </h2>
      <ul className='recommenders__unorderedList'>
        {filteredRecommenders.splice(0, 8).map((product) => (
          <li key={uuidv4()} className='recommenders__unorderedList__item'>
            <Link to={`/ecommerce/product/${product.sku}`}>
              <article>
                <figure>
                  <picture>
                    <img src={product.images?.small[0]} alt={`${product.company} ${product.unit}`} loading='lazy' decoding='async' fetchpriority='low' />
                    <figcaption>{`${product.company} ${product.unit}`}</figcaption>
                  </picture>
                </figure>
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
    </aside>
  );
};
export default MoreLikeThis;
