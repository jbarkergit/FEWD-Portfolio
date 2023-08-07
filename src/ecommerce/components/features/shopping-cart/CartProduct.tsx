import { v4 as uuidv4 } from 'uuid';
import useCart from '../../../hooks/useCart';
import { CartProductType } from '../../../context/CartContext';

const CartProducts = (): JSX.Element[] => {
  const { dispatch, REDUCER_ACTIONS, shoppingCart } = useCart();
  return shoppingCart.map((product: CartProductType) => {
    return (
      <li key={uuidv4()}>
        <article className="ecoModal__lineItem">
          <picture>{product.images ? <img src={product.images![0]} alt={product.unit} loading="lazy" decoding="async" fetchpriority="low" /> : null}</picture>
          <div className="ecoModal__lineItem__information">
            <hgroup>
              <h2>{`${product.company} ${product.unit} ${Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(product.price)}`}</h2>
              <h3>
                {product.company} {product.unit}
              </h3>
              <h4>{Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(product.price)}</h4>
            </hgroup>
            <div className="ecoModal__lineItem__information__quantity">
              <button onClick={() => dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: product })}>-</button>
              <span>{product.quantity}</span>
              <button onClick={() => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, quantity: 1 } })}>+</button>
            </div>
          </div>
        </article>
      </li>
    );
  });
};

export default CartProducts;
