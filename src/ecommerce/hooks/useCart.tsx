import { useContext } from 'react';
import CartContext from '../context/CartProvider';
import { UseCartContextType } from '../context/CartProvider';

export const useCart = (): UseCartContextType => {
  return useContext(CartContext);
};
