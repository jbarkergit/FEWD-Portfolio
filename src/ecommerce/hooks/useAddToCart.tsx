import { ReducerAction, ReducerActionType } from '../context/CartContext';
import { ProductType } from '../types/ProductType';

export type addToCartType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

export const addToCart = ({ dispatch, REDUCER_ACTIONS, product }: addToCartType) => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, stock: 1 } });
