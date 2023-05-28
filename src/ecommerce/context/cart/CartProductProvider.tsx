import { ReactElement, createContext, useState } from 'react';
import { ChildrenType, ProductType } from '../exports/types';
import { ProductDatabase } from '../../assets/data/ProductDatabase';

const initState: ProductType[] = ProductDatabase;

export type UseCartProductContextType = { cartProducts: ProductType[] };

const initContextState: UseCartProductContextType = { cartProducts: [] };

const CartProductContext = createContext<UseCartProductContextType>(initContextState);

export const CartProductProvider = ({ children }: ChildrenType): ReactElement => {
  const [cartProducts, setCartProducts] = useState<ProductType[]>(initState);

  return <CartProductContext.Provider value={{ cartProducts }}>{children}</CartProductContext.Provider>;
};

export default CartProductContext;
