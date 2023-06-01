import { ReactElement, createContext, useState } from 'react';
import { ProductDatabase } from '../../assets/data/ProductDatabase';
import { ProductType } from '../exports/types';
import { ChildrenType } from '../exports/types';

const initState = ProductDatabase;

type UseCartProductContextType = { cartProduct: ProductType[] };

const initContextState: UseCartProductContextType = { cartProduct: [] };

const CartProductContext = createContext<UseCartProductContextType>(initContextState);

export const CartProductProvider = ({ children }: ChildrenType): ReactElement => {
  const [cartProduct, setCartProduct] = useState<ProductType[]>(initState);

  return <CartProductContext.Provider value={{ cartProduct }}>{children}</CartProductContext.Provider>;
};

export default CartProductContext;
