import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useCart from '../../../hooks/useCart';
import { Discover, Klarna, Mastercard, Stripe, Visa } from './PaymentMethods';

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

const ShoppingCart = (): JSX.Element => {
  const { cartQuantity, cartSubtotal, cart, dispatch, REDUCER_ACTIONS } = useCart(),
    [confirmation, setConfirmation] = useState<boolean>(false);

  function submitOrder(): void {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirmation(true);
  }

  return (
    <section className="shoppingModal" data-activity="inactive">
      <div className="shoppingCart">
        <div className="shoppingCart__header">Shopping Cart</div>
        <ul className="shoppingCart__products">{cart.length > 0 ? <CartProducts /> : <>Your cart is empty.</>}</ul>
        <div className="shoppingCart__productsGradient" />
        <div className="shoppingCart__orderDetails">
          <div className="shoppingCart__orderDetails--productTotal">
            <span>{cart.length > 0 ? <>Subtotal: </> : null}</span>
            <span>{cart.length > 0 ? <>{cartSubtotal}</> : null}</span>
          </div>
          <span className="shoppingCart__orderDetails--checkoutBtn">{cart.length > 0 ? <button onClick={submitOrder}>{'Checkout'}</button> : null}</span>
        </div>
        <div className="shoppingCart__checkoutMethods">
          <div className="shoppingCart__checkoutMethods__paymentProcessor">
            <Stripe />
            <Klarna />
          </div>
          <div className="shoppingCart__checkoutMethods__paymentMethods">
            <Discover />
            <Mastercard />
            <Visa />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
