import { ReactElement } from 'react';

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
