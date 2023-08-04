import { addToCartType } from '../types/AddToCartType';

export const addToCart = ({ dispatch, REDUCER_ACTIONS, product }: addToCartType) => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, stock: 1 } });
