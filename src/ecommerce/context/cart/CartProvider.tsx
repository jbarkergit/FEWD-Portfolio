import { useMemo, useReducer, createContext, ReactElement } from 'react';
import { ProductType } from '../exports/types';
import { ChildrenType } from '../exports/types';

type CartStateType = { cart: ProductType[] };

const initCartState: CartStateType = { cart: [] };

const REDUCER_ACTION_TYPE = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  QUANTITY: 'QUANTITY',
  SUBMIT: 'SUBMIT',
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: ProductType;
};

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error('Missing action.payload in REDUCER_ACTION_TYPE.ADD');
      }
      const { category, sku, company, unit, price } = action.payload;
      const filteredCart: ProductType[] = state.cart.filter((item) => item.sku !== sku);
      const itemExists: ProductType | undefined = state.cart.find((item) => item.sku === sku);
      const quantity: number = itemExists ? itemExists.quantity + 1 : 1;
      return { ...state, cart: [...filteredCart, { quantity, category, sku, company, unit, price }] };
    }

    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error('Missing action.payload in REDUCER_ACTION_TYPE.REMOVE');
      }
      const { sku } = action.payload;
      const filteredCart: ProductType[] = state.cart.filter((item) => item.sku !== sku);

      return { ...state, cart: [...filteredCart] };
    }

    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error('Missing action.payload in REDUCER_ACTION_TYPE.QUANTITY');
      }
      const { sku, quantity } = action.payload;
      const itemExists: ProductType | undefined = state.cart.find((item) => item.sku === sku);

      if (!itemExists) {
        throw new Error('Cannot update quantity, item does not exist');
      }

      const updatedItem: ProductType = { ...itemExists, quantity };

      const filteredCart: ProductType[] = state.cart.filter((item) => item.sku !== sku);

      return { ...state, cart: [...filteredCart, updatedItem] };
    }

    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error('Reducer Action Type is unidentified in the CartProvider');
  }
};

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalItems: number = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.quantity;
  }, 0);

  const totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.quantity * cartItem.price;
    }, 0)
  );

  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku);
    const itemB = Number(b.sku);
    return itemA - itemB;
  });

  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: '',
  cart: [],
};

export const CartContext = createContext<UseCartContextType>(initCartContextState);

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return <CartContext.Provider value={useCartContext(initCartState)}>{children}</CartContext.Provider>;
};

export default CartContext;
