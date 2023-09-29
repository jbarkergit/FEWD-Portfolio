import useCart from '../../../hooks/useCart';
import CartProduct from './CartProduct';
import EmptyCart from './EmptyCart';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

type PropType = {
  uiModal: string;
  setUiModal: Dispatch<SetStateAction<string>>;
};

const ShoppingCart = ({ uiModal, setUiModal }: PropType): JSX.Element => {
  const { dispatch, REDUCER_ACTIONS, shoppingCart, cartProductSubtotal, cartProductQuantity } = useCart();

  //Modal reference
  const modalWrapper = useRef<HTMLElement>(null);
  const shoppingCartModal = useRef<HTMLDivElement>(null);

  //Toggle modal
  useEffect(() => {
    modalWrapper.current?.setAttribute('data-status', uiModal === 'shoppingCart' ? 'active' : 'false');
    shoppingCartModal.current?.setAttribute('data-status', uiModal === 'shoppingCart' ? 'active' : 'false');
  }, [uiModal]);

  //Form Exterior Click Handler
  useEffect(() => {
    const handleExteriorClick = (e: PointerEvent) => {
      if (
        uiModal === 'shoppingCart' &&
        shoppingCartModal.current &&
        shoppingCartModal.current.getAttribute('data-status') === 'active' &&
        !shoppingCartModal.current?.contains(e.target as Node)
      ) {
        setUiModal('');
      }
    };

    document.body.addEventListener('pointerdown', handleExteriorClick);
    return () => document.body.removeEventListener('pointerdown', handleExteriorClick);
  }, [uiModal]);

  return (
    <section className='modalWrapper' ref={modalWrapper}>
      <div className='ecoModal' data-status='false' ref={shoppingCartModal}>
        <div className='ecoModal__header'>{cartProductQuantity > 0 ? <>{`Shopping Cart (${cartProductQuantity})`}</> : <>{'Shopping Cart'}</>}</div>
        {shoppingCart.length > 0 ? (
          <ul className='ecoModal__products'>
            <CartProduct />
          </ul>
        ) : (
          <EmptyCart setUiModal={setUiModal} />
        )}
        <div className='ecoModal__orderDetails'>
          {shoppingCart.length > 0 ? <button onClick={() => dispatch({ type: REDUCER_ACTIONS.SUBMIT })}>Subtotal {cartProductSubtotal}</button> : null}
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
