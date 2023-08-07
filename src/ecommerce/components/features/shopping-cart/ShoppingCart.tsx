import { useEffect, useRef, useState } from 'react';
import { useModalContext } from '../../../context/ModalContext';
import useCart from '../../../hooks/useCart';
import CartProduct from './CartProduct';
import { Discover, Klarna, Mastercard, Paypal, Stripe, Visa } from '../../user-account/user-account-assets/PaymentMethodSVGS';

const ShoppingCart = (): JSX.Element => {
  // @ts-ignore
  const { ecoModalTab } = useModalContext();
  const ecoModal = useRef<HTMLDivElement>(null);
  const { dispatch, REDUCER_ACTIONS, shoppingCart, cartProductSubtotal } = useCart();

  useEffect(() => {
    if (ecoModal.current) ecoModal.current.setAttribute('data-status', ecoModalTab ? 'active' : 'false');
  }, [ecoModalTab]);

  return (
    <section className="ecoModalWrap">
      <div className="ecoModal" data-status="false" ref={ecoModal}>
        <div className="ecoModal__header">Shopping Cart</div>
        <ul className="ecoModal__products">{shoppingCart.length > 0 ? <CartProduct /> : <>Your cart is empty.</>}</ul>
        <div className="ecoModal__productsGradient" />
        <div className="ecoModal__orderDetails">
          <div className="ecoModal__orderDetails--productTotal">
            <span>{shoppingCart.length > 0 ? <>Subtotal: </> : null}</span>
            <span>{shoppingCart.length > 0 ? <>{cartProductSubtotal}</> : null}</span>
          </div>
          <span className="ecoModal__orderDetails--checkoutBtn">
            {shoppingCart.length > 0 ? <button onClick={() => dispatch({ type: REDUCER_ACTIONS.SUBMIT })}>{'Checkout'}</button> : null}
          </span>
        </div>
        <div className="ecoModal__checkoutMethods">
          <div className="ecoModal__checkoutMethods__paymentProcessor">
            <Stripe />
            <Klarna />
            <Paypal />
          </div>
          <div className="ecoModal__checkoutMethods__paymentMethods">
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
