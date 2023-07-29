import { useEffect, useRef, useState } from 'react';
import { useModalContext } from '../../../../context/modal/ModalContext';
import useCart from '../../../../hooks/useCart';
import CartProducts from './CartProducts';
import { Discover, Klarna, Mastercard, Paypal, Stripe, Visa } from '../data/PaymentMethods';

const ShoppingCart = (): JSX.Element => {
  // @ts-ignore
  const { ecoModalTab } = useModalContext(),
    ecoModal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ecoModal.current)
      ecoModalTab === 'shoppingCart' ? ecoModal.current.setAttribute('data-status', 'active') : ecoModal.current.setAttribute('data-status', 'false');
  }, [ecoModalTab]);

  const { cartSubtotal, cart, dispatch, REDUCER_ACTIONS } = useCart(),
    [confirmation, setConfirmation] = useState<boolean>(false);

  function submitOrder(): void {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirmation(true);
  }

  return (
    <section className="ecoModalWrap">
      <div className="ecoModal" data-status="false" ref={ecoModal}>
        <div className="ecoModal__header">Shopping Cart</div>
        <ul className="ecoModal__products">{cart.length > 0 ? <CartProducts /> : <>Your cart is empty.</>}</ul>
        <div className="ecoModal__productsGradient" />
        <div className="ecoModal__orderDetails">
          <div className="ecoModal__orderDetails--productTotal">
            <span>{cart.length > 0 ? <>Subtotal: </> : null}</span>
            <span>{cart.length > 0 ? <>{cartSubtotal}</> : null}</span>
          </div>
          <span className="ecoModal__orderDetails--checkoutBtn">{cart.length > 0 ? <button onClick={submitOrder}>{'Checkout'}</button> : null}</span>
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
