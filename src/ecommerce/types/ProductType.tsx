export type ProductType = {
  sku: string;
  stock: number;
  company: string;
  unit: string;
  description?: string;
  price: number;
  category?: string;
  polarPattern?: string | string[];
  wearStyle?: string;
  productshowcase?: boolean;
  images?: {
    small: string[];
    medium: string[];
    large: string[];
  };
};
