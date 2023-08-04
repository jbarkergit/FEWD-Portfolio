import { ReducerAction, ReducerActionType } from '../context/CartContext';
import { ProductType } from './ProductType';

export type addToCartType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};
