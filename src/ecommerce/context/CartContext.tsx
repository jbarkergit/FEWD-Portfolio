import { ReactElement, createContext, useMemo, useReducer } from 'react';
import { ChildrenType } from '../types/ChildrenType';

//define type for product in shopping cart
type CartProductType = {
  quantity: number;
  sku: string;
  company: string;
  unit: string;
  price: number;
};

//define type for shopping cart
type CartStateType = {
  cart: CartProductType[];
};

//initialize cart with an empty array
const initCartState: CartStateType = { cart: [] };

//define reducer action type
const CART_REDUCER_ACTION_TYPE = {
  QUANTITY: 'QUANTITY',
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  SUBMIT: 'SUBMIT',
};

//export reducer action type
export type CartReducerActionType = typeof CART_REDUCER_ACTION_TYPE;

//export type for reducer action (CART_REDUCER_ACTION_TYPE): string, PAYLOAD(optional): ProductType
export type CartReducerAction = {
  type: string;
  payload?: CartProductType;
};

//implement reducer using our pre-defined types, arguments for reducer are state and action
const cartReducer = (state: CartStateType, action: CartReducerAction): CartStateType => {
  switch (action.type) {
    case CART_REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) throw new Error('Action Payload may be void or undefined for Reducer Action Type QUANTITY');
      const { sku, quantity } = action.payload; //grab necessary data from CartProductType to send to our shopping cart
      const itemExists: CartProductType | undefined = state.cart.find((product) => product.sku === sku); //identify which product to update, if it exists

      if (!itemExists) throw new Error('Product SKU may be void or undefined: Reducer Action Type QUANTITY Failure');
      const updatedProduct: CartProductType = { ...itemExists, quantity };
      const filteredShoppingCart: CartProductType[] = state.cart.filter((product) => product.sku !== sku); //identify which products in the shopping cart we are not updating
      return { ...state, cart: [...filteredShoppingCart, updatedProduct] }; //spread array of products into shopping cart, updates quantity for specified product
    }
    case CART_REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) throw new Error('Action Payload may be void or undefined for Reducer Action Type ADD');
      const { sku, company, unit, price } = action.payload; //grab necessary data from CartProductType to send to our shopping cart
      const filteredShoppingCart: CartProductType[] = state.cart.filter((product) => product.sku !== sku); //identify which products in the shopping cart we are not updating
      const itemExists: CartProductType | undefined = state.cart.find((product) => product.sku === sku); //identify which product to update, if it exists
      const quantity: number = itemExists ? itemExists.quantity + 1 : 1; //if product exists, add one to current quantity, otherwise add one
      return { ...state, cart: [...filteredShoppingCart, { quantity, sku, company, unit, price }] }; //spread array of products into shopping cart with quantity & data
    }
    case CART_REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) throw new Error('Action Payload may be void or undefined for Reducer Action Type REMOVE');
      const { sku } = action.payload; //grab necessary data from CartProductType to send to our shopping cart
      const filteredShoppingCart: CartProductType[] = state.cart.filter((product) => product.sku !== sku); //identify which products in the shopping cart to remove
      return { ...state, cart: [...filteredShoppingCart] }; //removes specified item from cart
    }
    case CART_REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] }; //handle submission logic -> returning an empty array until I'm ready to handle a payment gateway/processor
    }
    default:
      throw new Error('Reducer Action Type may be unidentified');
  }
};

//custom hook for useCartContext utilizing React.useReducer: envoked locally, no export required
const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(cartReducer, initCartState);

  const REDUCER_ACTIONS = useMemo(() => {
    return CART_REDUCER_ACTION_TYPE;
  }, []); //prevents rerenders via caching

  const cartProductQuantity: number = state.cart.reduce((previousValue, cartProduct) => {
    return previousValue + cartProduct.quantity;
  }, 0);

  const cartProductSubtotal: string = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    state.cart.reduce((previousValue, cartProduct) => {
      return previousValue + cartProduct.quantity * cartProduct.price;
    }, 0)
  );

  const shoppingCart = state.cart.sort((a: CartProductType, b: CartProductType) => (a.unit > b.unit ? 1 : -1));

  return { dispatch, REDUCER_ACTIONS, cartProductQuantity, cartProductSubtotal, shoppingCart };
};

//export type for UseCartContext
export type UseCartContextType = ReturnType<typeof useCartContext>;

//define initial values for UseCartContext
const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: CART_REDUCER_ACTION_TYPE,
  cartProductQuantity: 0,
  cartProductSubtotal: '',
  shoppingCart: [],
};

//create CartContext
const CartContext = createContext<UseCartContextType>(initCartContextState);

//export CartContext Provider to pass required Shopping Cart data throughout application
export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return <CartContext.Provider value={useCartContext(initCartState)}>{children}</CartContext.Provider>;
};
