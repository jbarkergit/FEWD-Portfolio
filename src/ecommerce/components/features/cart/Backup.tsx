import React, { ChangeEvent, ReactElement, memo, useContext, useState } from 'react';
import CartContext, { ReducerAction, ReducerActionType } from '../../../context/cart/CartProvider';
// import CartProductContext from '../../../context/cart/CartProductProvider';
import { CartProductType, ProductType } from '../../../context/exports/types';
import { MemoizedCartLineItem } from './CartLineItem';

const CartProduct = ({ product, dispatch, REDUCER_ACTIONS, inCart }: CartProductType): ReactElement => {
  const img: string = new URL(`/src/ecommerce/assets/product-src/${product.company}/${product.category}/${product.sku}.replace(' ', '-').png`, import.meta.url).href;

  const onAddToCart = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, quantity: 1 } });
  const itemInCart = inCart ? 'The item is in your cart.' : null;
  const content = (
    <li>
      <span>{product.unit}</span>
      <img src={img} alt={product.unit} />
      <p>
        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
        {itemInCart}
      </p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </li>
  );

  return content;
};

function areCartProductsEqual({ product: previousProduct, inCart: previousInCart }: CartProductType, { product: nextProduct, inCart: nextInCart }: CartProductType) {
  return (
    Object.keys(previousProduct).every((key) => {
      return previousProduct[key as keyof ProductType] === nextProduct[key as keyof ProductType];
    }) && previousInCart === nextInCart
  );
}

const MemoizedCartProduct = memo<typeof CartProduct>(CartProduct, areCartProductsEqual);

// const CartProductList = () => {
//   const { dispatch, REDUCER_ACTIONS, cart } = useContext(CartContext);
//   // const { cartProduct } = useContext(CartProductContext);

//   let cartContent: ReactElement | ReactElement[];

//   if (cartProduct?.length) {
//     cartContent = cartProduct.map((product) => {
//       const inCart: boolean = cart.some((item) => item.sku === product.sku);
//       return <CartProduct key={product.sku} product={product} dispatch={dispatch} REDUCER_ACTIONS={REDUCER_ACTIONS} inCart={inCart} />;
//     });
//   }
// };

// type cartLineItemType = {
//   item: ProductType;
//   dispatch: React.Dispatch<ReducerAction>;
//   REDUCER_ACTIONS: ReducerActionType;
// };

// const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: cartLineItemType) => {
//   const img: string = new URL(`/src/ecommerce/assets/product-src/${item.company}/${item.category}/${item.sku}.replace(' ', '-').png`, import.meta.url).href;
//   const lineTotal: number = item.quantity * item.price;
//   const highestQuantity: number = 20 > item.quantity ? 20 : item.quantity;
//   const optionValues: number[] = [...Array(highestQuantity).keys()].map((i) => i + 1);
//   const options: ReactElement[] = optionValues.map((val) => {
//     return (
//       <option key={`opt${val}`} value={val}>
//         {val}
//       </option>
//     );
//   });

//   const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual);

//   function areItemsEqual({ item: previousItem }: cartLineItemType, { item: nextItem }: cartLineItemType) {
//     return Object.keys(previousItem).every((key) => {
//       return previousItem[key as keyof ProductType] === nextItem[key as keyof ProductType];
//     });
//   }

//   const onChangeQuantity = (event: ChangeEvent<HTMLSelectElement>) => {
//     dispatch({ type: REDUCER_ACTIONS.QUANTITY, payload: { ...item, quantity: Number(event.target.value) } });
//   };

//   const onRemoveFromCart = () => dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: item });

//   const content = (
//     <li className="cart__item">
//       <img src="{img}" alt="{item.name}" className="cart__img" />
//       <div aria-label="Item Name">{item.unit}</div>
//       <div aria-label="Price Per Item">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}</div>

//       <label htmlFor="itemQuantity" className="offscreen">
//         Item Quantity
//       </label>
//       <select name="itemQuantity" id="itemQuantity" className="cart__select" value={item.quantity} aria-label="Item Quantity" onChange={onChangeQuantity}>
//         {options}
//       </select>
//       <>
//         <div className="cart__item--subtotal" ria-label="Line Item Subtotal">
//           {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lineTotal)}
//         </div>
//         <button className="cart__button" aria-label="Remove Item from Cart" title="Remove Item from Cart" onClick={onRemoveFromCart}>
//           Remove
//         </button>
//       </>
//     </li>
//   );

//   return content;
// };

const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useContext(CartContext);

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  return (
    <section className="shoppingModal" data-activity="inactive">
      <div className="shoppingCart">
        <div className="shoppingCart__heading">
          <h2>Shopping Cart</h2>
        </div>
        <ul className="ShoppingCart__products">
          {confirm ? (
            <h2>Thank you.</h2>
          ) : (
            cart.map((item) => {
              return <MemoizedCartLineItem key={item.sku} item={item} dispatch={dispatch} REDUCER_ACTIONS={REDUCER_ACTIONS} />;
            })
          )}
        </ul>
        <div className="shoppingCart__orderDetails flexBox flexColumn">
          <span className="shoppingCart__orderDetails--totalItems">
            <h4>Total Items: {totalItems}</h4>
          </span>
          <span className="shoppingCart__orderDetails--subtotal">
            <h4>Subtotal: {totalPrice}</h4>
          </span>
          <span className="shoppingCart__orderDetails--shippingNotice">
            <h4></h4>
          </span>
        </div>
        <div>
          <button className="shoppingCart__checkout" disabled={!totalItems} onClick={onSubmitOrder}>
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
