import { useContext } from 'react';
import { CartContext, UseCartContextType } from '../context/CartContext';

export const useCart = (): UseCartContextType => {
  return useContext(CartContext);
};
