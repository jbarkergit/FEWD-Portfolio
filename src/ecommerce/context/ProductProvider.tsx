import { Link } from 'react-router-dom';
import { ReducerAction, ReducerActionType } from './CartContext';
import { ProductType } from './ProductType';

type addToCartType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

const ProductProvider = ({ product, dispatch, REDUCER_ACTIONS }: addToCartType): JSX.Element => {
  const addToCart = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, stock: 1 } });
  return (
    <li>
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
