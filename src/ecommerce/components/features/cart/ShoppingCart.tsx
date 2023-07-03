import { v4 as uuidv4 } from 'uuid';
import useCart from '../../../hooks/useCart';
import { useState } from 'react';

const ShoppingCart = (): JSX.Element => {
  const { cartQuantity, cartSubtotal, cart, dispatch, REDUCER_ACTIONS } = useCart(),
    [confirmation, setConfirmation] = useState<boolean>(false);

  const CartProducts = (): JSX.Element[] => {
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
                <h4>{product.company}</h4>
                <h3>{product.unit}</h3>
                <h5>{Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(product.price)}</h5>
              </hgroup>
              <div className="shoppingCart__lineItem__info__qtyBtns">
                <button></button>
                <>Quantity: {cartQuantity}</>
                <button></button>
              </div>
              {cartQuantity > 0 ? `Subtotal: ${Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(product.price * cartQuantity)}` : null}
            </div>
          </article>
        </li>
      );
    });
  };

  const submitOrder = (): void => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirmation(true);
  };

  return (
    <section className="shoppingModal" data-activity="inactive">
      <div className="shoppingCart">
        <h2>Shopping Cart</h2>
        <ul>{cart.length > 0 ? <CartProducts /> : <>Your cart is empty.</>}</ul>
        <div className="shoppingCart__orderDetails">
          <span>
            <h3>{cart.length > 0 ? <>Products: {cartQuantity}</> : null}</h3>
          </span>
          <span>
            <h3>{cart.length > 0 ? <>Subtotal: {cartSubtotal}</> : null}</h3>
          </span>
        </div>
        <div className="shoppingCart__checkout">{cart.length > 0 ? <button onClick={submitOrder}>Checkout</button> : null}</div>
      </div>
    </section>
  );
};

export default ShoppingCart;
