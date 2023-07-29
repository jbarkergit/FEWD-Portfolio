import { useState } from 'react';
import useCart from '../../../../hooks/useCart';
import { Discover, Klarna, Mastercard, Paypal, Stripe, Visa } from './PaymentMethods';
import CartProducts from './CartProducts';

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
            <Paypal />
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
