import { useEffect, useRef } from 'react';
import { useModalContext } from '../../../context/ModalContext';
import useCart from '../../../hooks/useCart';
import CartProduct from './CartProduct';
import EmptyCart from './EmptyCart';
import { Stripe } from '../../user-account/user-account-assets/PaymentMethodSVGS';

const ShoppingCart = (): JSX.Element => {
  // @ts-ignore
  const { ecoModalTab } = useModalContext();
  const ecoModal = useRef<HTMLDivElement>(null);
  const { dispatch, REDUCER_ACTIONS, shoppingCart, cartProductSubtotal, cartProductQuantity } = useCart();

  useEffect(() => {
    if (ecoModal.current) {
      ecoModal.current.setAttribute('data-status', ecoModalTab ? 'active' : 'false');
      ecoModalTab ? ecoModal.current.focus() : null;
    }
  }, [ecoModalTab]);

  return (
    <section className="ecoModalWrap">
      <div className="ecoModal" data-status="false" ref={ecoModal}>
        <div className="ecoModal__header">{cartProductQuantity > 0 ? <>{`Shopping Cart (${cartProductQuantity})`}</> : <>{'Shopping Cart'}</>}</div>
        {shoppingCart.length > 0 ? (
          <ul className="ecoModal__products">
            <CartProduct />
          </ul>
        ) : (
          <EmptyCart />
        )}
        <div className="ecoModal__orderDetails">
          {shoppingCart.length > 0 ? (
            <button onClick={() => dispatch({ type: REDUCER_ACTIONS.SUBMIT })}>
              <span>Subtotal: {cartProductSubtotal}</span>
              <span>
                {'Secure Checkout with'} <Stripe />
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
