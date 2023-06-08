import { ReactElement } from 'react';

export type ChildrenType = { children?: ReactElement | ReactElement[] };

export type ProductType = {
  sku: string;
  quantity: number;
  company: string;
  unit: string;
  description?: string;
  price: number;
  category?: string;
  wearStyle?: string;
  productshowcase?: boolean;
  images?: string[];
};
