import useCart from '../../../hooks/useCart';
import CartProduct from './CartProduct';
import EmptyCart from './EmptyCart';
import { Stripe } from '../../user-account/user-account-assets/PaymentMethodSVGS';
import { useEffect, useRef } from 'react';

type PropType = {
  dataStatus: string;
};

const ShoppingCart = ({ dataStatus }: PropType): JSX.Element => {
  const { dispatch, REDUCER_ACTIONS, shoppingCart, cartProductSubtotal, cartProductQuantity } = useCart();

  const shoppingCartModal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shoppingCartModal.current) shoppingCartModal.current?.setAttribute('data-status', dataStatus === 'shoppingCart' ? 'active' : 'false');
  }, [dataStatus]);

  return (
    <section className="ecoModalWrap">
      <div className="ecoModal" data-status="false" ref={shoppingCartModal}>
        <div className="ecoModal__header">{cartProductQuantity > 0 ? <>{`Shopping Cart (${cartProductQuantity})`}</> : <>{'Shopping Cart'}</>}</div>
        {shoppingCart.length > 0 ? (
          <ul className="ecoModal__products">
            <CartProduct />
          </ul>
        ) : (
          <EmptyCart />
        )}
        <div className="ecoModal__orderDetails">
          {shoppingCart.length > 0 ? <button onClick={() => dispatch({ type: REDUCER_ACTIONS.SUBMIT })}>Subtotal {cartProductSubtotal}</button> : null}
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
