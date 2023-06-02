import { ReactElement } from 'react';
import { ReducerAction, ReducerActionType } from '../cart/CartProvider';

export type ChildrenType = { children?: ReactElement | ReactElement[] };

export type ProductType = {
  quantity: number;
  category: string;
  sku: string;
  company: string;
  unit: string;
  description?: string;
  operation?: string;
  soundinfo?: string;
  cable?: string;
  impedance?: string;
  price: number;
  images?: string[];
  productshowcase?: boolean;
};

export type CartProductType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};
