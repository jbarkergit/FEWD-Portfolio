import { ReactElement, createContext, useMemo, useReducer } from 'react';
import { ChildrenType, ProductType } from '../exports/types';

export type CartProductType = ProductType;

type CartStateType = {
  cart: CartProductType[];
};

const initCartState: CartStateType = {
  cart: [],
};

const REDUCER_ACTION_TYPE = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  QUANTITY: 'QUANTITY',
  SUBMIT: 'SUBMIT',
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartProductType;
};

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error('Missing action.payload in ADD action case.');
      }
      const { category, sku, company, unit, description, price, images } = action.payload;
      const filteredCart: CartProductType[] = state.cart.filter((product) => product.sku !== sku);
      const productExists: CartProductType | undefined = state.cart.find((product) => product.sku === sku);
      const quantity: number = productExists ? productExists.quantity + 1 : 1;
      return { ...state, cart: [...filteredCart, { category, sku, company, unit, description, price, images, quantity }] };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error('Missing action.payload in REMOVE action case.');
      }
      const { sku } = action.payload;
      const filteredCart: CartProductType[] = state.cart.filter((product) => product.sku !== sku);

      return { ...state, cart: [...filteredCart] };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error('Missing action.payload in QUANTITY action case.');
      }
      const { sku, quantity } = action.payload;
      const productExists: CartProductType | undefined = state.cart.find((product) => product.sku === sku);
      if (!productExists) {
        throw new Error('Product must exist to update quantities.');
      }
      const updatedProduct: CartProductType = { ...productExists, quantity };
      const filteredCart: CartProductType[] = state.cart.filter((product) => product.sku !== sku);

      return { ...state, cart: [...filteredCart, updatedProduct] };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error('Reducer Action Type is unidentified.');
  }
};

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);
  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalProducts: number = state.cart.reduce((previousValue, cartProduct) => {
    return previousValue + cartProduct.quantity;
  }, 0);

  const totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    state.cart.reduce((previousValue, cartProduct) => {
      return previousValue + cartProduct.quantity * cartProduct.price;
    }, 0)
  );

  const cart = state.cart.sort((a, b) => (a.company > b.company ? 1 : -1));

  return { dispatch, REDUCER_ACTIONS, totalProducts, totalPrice, cart };
};

export type useCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: useCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalProducts: 0,
  totalPrice: '',
  cart: [],
};

export const CartContext = createContext<useCartContextType>(initCartContextState);

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return <CartContext.Provider value={useCartContext(initCartState)}>{children}</CartContext.Provider>;
};

export default CartContext;
