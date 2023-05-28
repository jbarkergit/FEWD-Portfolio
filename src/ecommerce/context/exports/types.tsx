import { ReactElement } from 'react';

export type ProductType = {
  quantity: number;
  category: string;
  sku: string;
  company: string;
  unit: string;
  description: string;
  operation?: string;
  soundinfo?: string;
  cable?: string;
  impedance?: string;
  price: number;
  images: string[];
  productshowcase?: boolean;
};

export type ChildrenType = { children?: ReactElement | ReactElement[] };
