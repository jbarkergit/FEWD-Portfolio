import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import useCart from '../../../hooks/useCart';
import CartProduct from './CartProduct';
import EmptyCart from './EmptyCart';

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

  return (
    <section className='modalWrapper' data-status={uiModal === 'shoppingCart' ? 'active' : 'false'}>
      <div className='ecoModal' data-status={uiModal === 'shoppingCart' ? 'active' : 'false'} ref={shoppingCartModal} style={{ display: 'block' }}>
        <div className='shoppingCart'>
          <div className='shoppingCart__header'>{cartProductQuantity > 0 ? <>{`Shopping Cart (${cartProductQuantity})`}</> : <>{'Shopping Cart'}</>}</div>

          {shoppingCart.length > 0 ? (
            <ul className='shoppingCart__products' ref={shoppingCartProducts}>
              <CartProduct />
            </ul>
          ) : (
            <EmptyCart setUiModal={setUiModal} />
          )}

          <div className='shoppingCart__buttons'>
            {shoppingCart.length > 0 ? <button onClick={() => dispatch({ type: REDUCER_ACTIONS.SUBMIT })}>Subtotal {cartProductSubtotal}</button> : null}
            <button className='ecoModal__return' onClick={() => setUiModal('')}>
              <svg xmlns='http://www.w3.org/2000/svg' width='1.6em' height='1.6em' viewBox='0 0 24 24'>
                <path
                  fill='#ffffff'
                  d='M9 19q-.5 0-.938-.225t-.712-.625l-3.525-5Q3.45 12.625 3.45 12t.375-1.15l3.525-5q.275-.4.713-.625T9 5h10q.825 0 1.413.588T21 7v10q0 .825-.588 1.413T19 19H9Zm5-5.6l1.9 1.9q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7L15.4 12l1.9-1.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L14 10.6l-1.9-1.9q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l1.9 1.9l-1.9 1.9q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275l1.9-1.9Z'></path>
              </svg>
              Return
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
