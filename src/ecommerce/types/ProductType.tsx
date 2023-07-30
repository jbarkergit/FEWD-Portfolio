export type ProductType = {
  sku: string;
  stock: number;
  company: string;
  unit: string;
  description?: string;
  price: number;
  category?: string;
  wearStyle?: string;
  productshowcase?: boolean;
  images?: string[];
};
