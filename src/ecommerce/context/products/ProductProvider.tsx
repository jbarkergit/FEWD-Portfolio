import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ReducerAction, ReducerActionType } from '../cart/CartContext';
import { ProductType } from '../exports/types';

type addToCartType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

const ProductProvider = ({ product, dispatch, REDUCER_ACTIONS }: addToCartType): JSX.Element => {
  const addToCart = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, quantity: 1 } });
  return (
    <li key={uuidv4()}>
      <article className="productGrid__product">
        <Link to={`/ecommerce/product/${product.sku}`}>
          <span className="productGrid__product--containedHover">
            <picture>
              <img src={product.images![0]} alt={product.unit} loading="lazy" decoding="async" fetchpriority="high" />
            </picture>
          </span>
        </Link>
        <div className="productGrid__product__information">
          <Link to={`/ecommerce/product/${product.sku}`}>
            <h2>
              {product.company} {product.unit}
            </h2>
          </Link>
          <p>{product.description}</p>
          <div className="productGrid__product__advanced">
            <span>
              <h4>{Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(product.price)}</h4>
            </span>
            <span>
              <button onClick={addToCart}>
                <i className="fa-solid fa-cart-plus"></i>
              </button>
            </span>
          </div>
        </div>
      </article>
    </li>
  );
};

export default ProductProvider;
