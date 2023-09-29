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
  const shoppingCartModal = useRef<HTMLDivElement>(null); //Shopping cart modal reference
  const shoppingCartProducts = useRef<HTMLUListElement>(null); //Shopping cart product list reference

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

  //Scroll product list anywhere in modal
  useEffect(() => {
    const userScroll = (e: WheelEvent) => {
      if (uiModal === 'shoppingCart' && shoppingCartModal.current && shoppingCartProducts.current) {
        e.preventDefault();
        shoppingCartProducts.current.scrollBy(0, e.deltaY);
      }
    };

    shoppingCartModal.current?.addEventListener('wheel', userScroll);
    return () => shoppingCartModal.current?.removeEventListener('wheel', userScroll);
  }, [uiModal]);

  return (
    <section className='modalWrapper' data-status={uiModal === 'shoppingCart' ? 'active' : 'false'}>
      <div className='ecoModal' data-status={uiModal === 'shoppingCart' ? 'active' : 'false'} ref={shoppingCartModal}>
        <div className='ecoModal__container'>
          <div className='ecoModal__header' id='shoppingCartHeader'>
            {cartProductQuantity > 0 ? <>{`Shopping Cart (${cartProductQuantity})`}</> : <>{'Shopping Cart'}</>}
          </div>
          {shoppingCart.length > 0 ? (
            <ul className='ecoModal__products' ref={shoppingCartProducts}>
              <CartProduct />
            </ul>
          ) : (
            <EmptyCart setUiModal={setUiModal} />
          )}
          <div className='ecoModal__orderDetails'>
            {shoppingCart.length > 0 ? <button onClick={() => dispatch({ type: REDUCER_ACTIONS.SUBMIT })}>Subtotal {cartProductSubtotal}</button> : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
