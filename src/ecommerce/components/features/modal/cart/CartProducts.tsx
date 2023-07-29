import { v4 as uuidv4 } from 'uuid';
import useCart from '../../../../hooks/useCart';

const CartProducts = (): JSX.Element[] => {
  const { cartQuantity, cart } = useCart();

  return cart.map((product) => {
    return (
      <li key={uuidv4()}>
        <article className="shoppingCart__lineItem">
          <picture>
            <img src={product.images![0]} alt={product.unit} loading="lazy" decoding="async" fetchpriority="low" />
          </picture>
          <div className="shoppingCart__lineItem__information">
            <hgroup>
              <h2>{`${product.company} ${product.unit} ${Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(product.price)}`}</h2>
              <h3>
                {product.company} {product.unit}
              </h3>
              <h4>{Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(product.price)}</h4>
            </hgroup>
            <div className="shoppingCart__lineItem__information__cart">
              <span className="shoppingCart__lineItem__information__cart--totalText">Subtotal: </span>
              <span className="shoppingCart__lineItem__information__cart--subtotal">
                {cartQuantity > 1 ? `${Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(product.price * cartQuantity)}` : null}
              </span>
              <div className="shoppingCart__lineItem__information__cart__quantity">
                <button>-</button>
                <span>{cartQuantity}</span>
                <button>+</button>
              </div>
            </div>
          </div>
        </article>
      </li>
    );
  });
};

export default CartProducts;
