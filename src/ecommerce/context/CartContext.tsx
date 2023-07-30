import { ReactElement, ReactNode, createContext, useMemo, useReducer } from 'react';
import { ProductType } from './ProductType';

type CartStateType = { cart: ProductType[] };

const initCartState: CartStateType = { cart: [] },
  REDUCER_ACTION_TYPE = {
    QUANTITY: 'QUANTITY',
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR: 'CLEAR',
    SUBMIT: 'SUBMIT',
  };

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;
export type ReducerAction = {
  type: string;
  payload?: ProductType;
};

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) throw new Error('ERROR: action.payload is missing in Reducer Action Type QUANTITY');
      const { sku, stock } = action.payload,
        productExists: ProductType | undefined = state.cart.find((product) => product.sku === sku);

      if (!productExists) throw new Error('ERROR: Cannot update quantity, product does not exist');
      const updatedProduct: ProductType = { ...productExists, stock },
        filteredCart: ProductType[] = state.cart.filter((product) => product.sku !== sku);

      return { ...state, cart: [...filteredCart, updatedProduct] };
    }

    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) throw new Error('ERROR: action.payload is missing in Reducer Action Type ADD');
      const { sku, company, unit, price, images } = action.payload,
        filteredCart: ProductType[] = state.cart.filter((product) => product.sku !== sku),
        productExists: ProductType | undefined = state.cart.find((product) => product.sku === sku),
        stock: number = productExists ? productExists.stock + 1 : 1;

      return {
        ...state,
        cart: [...filteredCart, { sku, stock, company, unit, price, images }],
      };
    }

    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) throw new Error('ERROR: action.payload is missing in Reducer Action Type REMOVE');
      const { sku } = action.payload,
        filteredCart: ProductType[] = state.cart.filter((product) => product.sku !== sku);

      return { ...state, cart: [...filteredCart] };
    }

    case REDUCER_ACTION_TYPE.CLEAR: {
      return { ...state, cart: [] };
    }

    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error('ERROR: Reducer Action Type may be undefined');
  }
};

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const cartQuantity: number = state.cart.reduce((previousValue, cartProduct) => {
    return previousValue + cartProduct.stock;
  }, 0);

  const cartSubtotal: string = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    state.cart.reduce((previousValue, cartProduct) => {
      return previousValue + cartProduct.stock * cartProduct.price;
    }, 0)
  );

  const cart = state.cart.sort((a: ProductType, b: ProductType) => (a.unit > b.unit ? 1 : -1));

  return { dispatch, REDUCER_ACTIONS, cartQuantity, cartSubtotal, cart };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  cartQuantity: 0,
  cartSubtotal: '',
  cart: [],
};

export const CartContext = createContext<UseCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactNode };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return <CartContext.Provider value={useCartContext(initCartState)}>{children}</CartContext.Provider>;
};
